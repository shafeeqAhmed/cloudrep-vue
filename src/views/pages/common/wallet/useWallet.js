import { ref, watch, computed } from "@vue/composition-api";
import store from "@/store";
import { title } from "@core/utils/filter";

// Notification
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
// import axiosIns from '@/libs/axios'
import axios from '@axios'


export default function useWallet() {
  // Use toast
  const toast = useToast();

  const refListTable = ref(null);

  // Table Handlers
  const tableColumns = [
    { key: "type", label: "Payable Type", sortable: true },
    { key: "amount", label: "Amount", sortable: true },
    { key: "meta", label: "Description", sortable: true },
    { key: "transaction_type", label: "Transaction", sortable: true },
    { key: "cardNo", label: "Card No.",},
    // { key: "actions" ,label: "Actions",},
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
  const fetchUsers = (ctx, callback) => {
    store
      .dispatch("wallet/fetchTransaction", {
        q: searchQuery.value,
      perPage: perPage.value,
      page: currentPage.value,
      sortBy: sortBy.value,
      sortDesc: isSortDirDesc.value == true ? false : true,
     })
    .then(response => {
      const {
        data: {
          transaction 
        },
      } = response;

      currentPage.value = transaction.current_page;
      totalUsers.value = transaction.total;
      perPage.value = transaction.per_page;

      callback(transaction.data)
    })
    .catch(error => {
      toast({
        component: ToastificationContent,
        props: {
          title: 'Error Fetching REcord',
          icon: 'AlertTriangleIcon',
          variant: 'danger',
        },
      })
    })

    // axios
    // .get(`/get-transactions`, { 
    //   q: searchQuery.value,
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
    fetchUsers,
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
