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
    { key: "name", label: "Plan Name", sortable: true },
    { key: "target.name", label: "Target Name", sortable: true },
    { key: "target.destination", label: "Destination", sortable: true },
    { key: "priority", label: "Priority", sortable: true },
    { key: "weight", label: "Weight", sortable: true },
    { key: "duplicate_conversation_type", label: "Type", sortable: true },
    { key: "revenue", label: "Revenue", sortable: true },
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

  const fetchRoutingPlans = (ctx, callback) => {
    const uuid = router.history.current.params?.uuid;

    store
      .dispatch("routingsAndTargets/getRoutingPlans", {
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
            data: { routingPlan },
          },
        } = response;
        currentPage.value = routingPlan.current_page;
        totalTargets.value = routingPlan.total;
        perPage.value = routingPlan.per_page;

        callback(routingPlan.data);
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: "Error fetching Routing Plans",
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      });
  };

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  // const resolveUserRoleVariant = (role) => {
  //   if (role === "subscriber") return "primary";
  //   if (role === "author") return "warning";
  //   if (role === "maintainer") return "success";
  //   if (role === "editor") return "info";
  //   if (role === "admin") return "danger";
  //   return "primary";
  // };

  // const resolveUserRoleIcon = (role) => {
  //   if (role === "subscriber") return "UserIcon";
  //   if (role === "author") return "SettingsIcon";
  //   if (role === "maintainer") return "DatabaseIcon";
  //   if (role === "editor") return "Edit2Icon";
  //   if (role === "admin") return "ServerIcon";
  //   return "UserIcon";
  // };

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

  return {
    fetchRoutingPlans,
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
  };
}
