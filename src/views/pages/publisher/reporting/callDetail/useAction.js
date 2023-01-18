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
      key: "call_date",
      label: "Call Date",
      sortable: true,
    },
    {
      key: "campaign_name",
      label: "Campaign",
      sortable: true,
    },

    {
      key: "caller_id",
      label: "Caller ID",
      sortable: true,
    },
    {
      key: "dialed",
      label: "Dialed#",
      sortable: true,
    },
    {
      key: "time_to_call",
      label: "Time To Call",
      sortable: true,
    },
    {
      key: "duplicate",
      label: "Duplicate",
      sortable: true,
    },
    {
      key: "call_status",
      sortable: true,
    },
    {
      key: "time_to_connect",
      label: "Time To Connect",
      sortable: true,
    },
    {
      key: "target_name",
      label: "Target",
      sortable: true,
    },

    {
      key: "payout",
      label: "Payout",
      sortable: true,
    },

    {
      key: "duration",
      label: "Duration",
      sortable: true,
    },
    {
      key: "recording",
      label: "Recording",
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
  timeLineFilter.value=store.state.managePublisherReporting.timeLineFilter;
  const fetchCampaignReporting = (ctx, callback) => {
    store
      .dispatch("managePublisherReporting/getCampaignReporting", {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value == true ? false : true,
        user_uuid:timeLineFilter.value.timeLineFilterUuid,
        time_zone:timeLineFilter.value.timeLineFilterTimeZone,
        dateRange:timeLineFilter.value.timeLineFilterDateRange,
        customFilters:timeLineFilter.value.customFilters,
      })
      .then((response) => {
        const {
          data: {
            data: { campaignReporting },
          },
        } = response;
        currentPage.value = campaignReporting.current_page;
        totalUsers.value = campaignReporting.total;
        perPage.value = campaignReporting.per_page;
        store.commit("managePublisherReporting/UPDATE_SUMMARY_DATA", campaignReporting.data);
        callback(campaignReporting.data);
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: "Error fetching Campaign Reporting list",
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      });
  };

  const center = { lat: -28.024, lng: 140.887 };

  return {
    fetchCampaignReporting,
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
