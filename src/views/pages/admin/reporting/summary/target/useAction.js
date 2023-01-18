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
      key: "name",
      label: "Target Name",
      sortable: true,
    },
    {
      key: "incomming",
      label: "Incomming",
      sortable: true,
    },
    {
      key: "connected",
      label: "Connected",
      sortable: true,
    },
    {
      key: "converted",
      label: "Converted",
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
    },
    {
      key: "profit",
      label: "Profit",
      sortable: true,
    },

    {
      key: "duplicate",
      label: "Duplicate",
      sortable: true,
    },

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
  const timeLineFilter=ref(null);


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
  timeLineFilter.value=store.state.manageReporting.timeLineFilter;
  const fetchTimeLineSummary = (ctx, callback) => {
    console.log('fetchTimeLineSummary');
    store
      .dispatch("manageReporting/getTimeLineSummaryRecord", {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value == true ? false : true,
        user_uuid:timeLineFilter.value.timeLineFilterUuid,
        time_zone:timeLineFilter.value.timeLineFilterTimeZone,
        dateRange:timeLineFilter.value.timeLineFilterDateRange,
        customFilters:timeLineFilter.value.customFilters,
        type:'target'
      })
      .then((response) => {

        const {
          data: {
            data: { timeLineSummary },
          },
        } = response;

        currentPage.value = timeLineSummary.current_page;
        totalUsers.value = timeLineSummary.total;
        perPage.value = timeLineSummary.per_page;

        callback(timeLineSummary);
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: "Error fetching Time Line Campaign Summary",
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      });
  };

  const center = { lat: -28.024, lng: 140.887 };

  return {
    fetchTimeLineSummary,
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
    center,
  };
}
