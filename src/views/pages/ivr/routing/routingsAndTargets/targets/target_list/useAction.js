import { ref, watch, computed } from "@vue/composition-api";
import store from "@/store";
import { title } from "@core/utils/filter";
import router from "@/router";
// Notification
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default function useAction() {
  // Use toast
  const toast = useToast();

  const refListTable = ref(null);

  // Table Handlers
  const tableColumns = [
    { key: "name", label: "Name", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "destination", label: "Destination", sortable: true },
    { key: "is_primary", label: "Is Primary", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "actions" },
  ];
  const perPage = ref(10);
  const totalTargets = ref(0);
  const currentPage = ref(1);
  const perPageOptions = [10, 25, 50, 100];
  const searchQuery = ref("");
  const sortBy = ref("id");
  const isSortDirDesc = ref(false);
  const roleFilter = ref(null);
  const planFilter = ref(null);
  const statusFilter = ref(null);

  const dataMeta = computed(() => {
    const localItemsCount = refListTable.value
      ? refListTable.value.localItems.length
      : 0;
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalTargets.value,
    };
  });

  const refetchData = () => {
    refListTable.value.refresh();
  };

  watch(
    [currentPage, perPage, searchQuery, roleFilter, planFilter, statusFilter],
    () => {
      refetchData();
    }
  );

  const fetchTargets = (ctx, callback) => {
    const uuid = router.history.current.params?.uuid;
    store
      .dispatch("routingsAndTargets/getTargets", {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value == true ? false : true,
        uuid: uuid,
      })
      .then((response) => {
        const {
          data: {
            data: { targetListing },
          },
        } = response;
        currentPage.value = targetListing.current_page;
        totalTargets.value = targetListing.total;
        perPage.value = targetListing.per_page;

        callback(targetListing.data);
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: "Error fetching targets list",
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      });
  };

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveUserStatusVariant = (status) => {
    if (status === "pending") return "warning";
    if (status === "active") return "success";
    if (status === "inactive") return "danger";
    return "primary";
  };

  const resolveUserStatusVariantText = (status) => {
    if (status == "active") return "Open";
    if (status == "inactive") return "Close";
    if (status == "disable") return "Disabled";
    return "Open";
  };

  const isPrimaryVariant = (isPrimary) => {
    if (isPrimary == 1) return "success";
    if (isPrimary == 0) return "danger";
    return "danger";
  };

  const isPrimaryVariantText = (isPrimary) => {
    if (isPrimary == 1) return "Yes";
    if (isPrimary == 0) return "No";
    return "No";
  };

  return {
    fetchTargets,
    tableColumns,
    perPage,
    currentPage,
    totalTargets,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refListTable,
    resolveUserStatusVariant,
    refetchData,
    resolveUserStatusVariantText,
    // Extra Filters
    roleFilter,
    planFilter,
    statusFilter,
    isPrimaryVariant,
    isPrimaryVariantText,
  };
}
