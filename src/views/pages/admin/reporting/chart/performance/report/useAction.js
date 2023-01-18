import { ref, watch, computed } from "@vue/composition-api";
import store from "@/store";

// Notification
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default function useAction() {
  // Use toast
  const toast = useToast();

  const refListTable = ref(null);

  // Table Handlers
  const tableColumns = [
    {
      key: "date",
      label: "Date",
      sortable: true,
    },
    {
      key: "incomming",
      label: "Incomming",
      sortable: true,
    },
    {
      key: "converted",
      label: "Converted",
      sortable: true,
    },
    {
      key: "connected",
      label: "Connected",
      sortable: true,
    },
    {
      key: "not_answer",
      label: "Not Answer",
      sortable: true,
    },
    {
      key: "payout",
      label: "Payout",
      sortable: true,
    },
    {
      key: "revenue",
      label: "Revenue",
      sortable: true,
    }
  ];
  const perPage = ref(10);
  const totalUsers = ref(0);
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
      of: totalUsers.value,
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

  const fetchPerformanceReport = (ctx, callback) => {
    store
      .dispatch("manageReporting/getPerformanceReport", {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value == true ? false : true,
      })
      .then((response) => {
        const {
          data: {
            data: { performanceReport },
          },
        } = response;
        currentPage.value = performanceReport.current_page;
        totalUsers.value = performanceReport.total;
        perPage.value = performanceReport.per_page;
        callback(performanceReport);
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: "Error fetching Performance Report",
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      });
  };
  return {
    fetchPerformanceReport,
    tableColumns,
    perPage,
    currentPage,
    totalUsers,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refListTable,
    refetchData,
    // Extra Filters
    roleFilter,
    planFilter,
    statusFilter,
  };
}