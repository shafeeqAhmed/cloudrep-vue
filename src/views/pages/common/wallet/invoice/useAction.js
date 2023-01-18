import { ref, watch, computed } from "@vue/composition-api";
import store from "@/store";
import { title } from "@core/utils/filter";

// Notification
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
// import axiosIns from '@/libs/axios'
import axios from '@axios'


export default function useAction() {
  // Use toast
  const toast = useToast();

  const refListTable = ref(null);

  // Table Handlers
  const tableColumns = [
    { key: "date", label: "Date", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "description", label: "Description", sortable: true },
    { key: "amount", label: "Amount", sortable: true },
    { key: "card_type", label: "Card type", sortable: true },
    { key: "cardNo", label: "Card #",},
    { key: "invoice", label: "Invoice",},
  ];
  const perPage = ref(10);
  const totalUsers = ref(0);
  const currentPage = ref(1);
  const perPageOptions = [10, 25, 50, 100];
  const searchQuery = ref("");
  const selectedCampaign = ref("");
  // const dateRange = ref();
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
    [currentPage, perPage, selectedCampaign, roleFilter, planFilter, statusFilter],
    () => {
      refetchData();
    }
  );
  const fetchTransactions = (ctx, callback) => {
    // console.log(store.state.transaction.dateRange)
    store
      .dispatch("transaction/fetchTransaction", {
        // q: searchQuery.value,
        campaignUuid: selectedCampaign.value,
        dateRange: store.state.transaction.dateRange,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value == true ? false : true,
      })
      .then(response => {
        const {
          data: {
            data: {
              transactions
            } 
          },
        } = response;
  
        currentPage.value = transactions.current_page;
        totalUsers.value = transactions.total;
        perPage.value = transactions.per_page;
  
        callback(transactions.data)
    })
    .catch(error => {
      toast({
        component: ToastificationContent,
        props: {
          title: 'Error Fetching Records!',
          icon: 'AlertTriangleIcon',
          variant: 'danger',
        },
      })
    })

    // axios
    // .get(`/get-transactions`, { 
    //   // q: searchQuery.value,
    //   campaignUuid: selectedCampaign.value,
    //   perPage: perPage.value,
    //   page: currentPage.value,
    //   sortBy: sortBy.value,
    //   sortDesc: isSortDirDesc.value == true ? false : true,
    //  })
    // .then(response => {
    //   const {
    //     data: {
    //       transaction 
    //     },
    //   } = response;

    //   currentPage.value = transaction.current_page;
    //   totalUsers.value = transaction.total;
    //   perPage.value = transaction.per_page;

    //   callback(transaction.data)
    // })
    // .catch(error => {
    //   toast({
    //     component: ToastificationContent,
    //     props: {
    //       title: 'Error upload Csv',
    //       icon: 'AlertTriangleIcon',
    //       variant: 'danger',
    //     },
    //   })
    // })
  };

  return {
    fetchTransactions,
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
    selectedCampaign,
    // dateRange
  };
}
