import { ref, watch, computed } from "@vue/composition-api";
import store from "@/store";
import { title } from "@core/utils/filter";

// Notification
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { getUserData } from '@/auth/utils'

export default function useUsersList() {
  // Use toast
  const toast = useToast();

  const refListTable = ref(null);

  // Table Handlers
  const tableColumns = [
    { key: "number", label: "NUMBER", sortable: true },
    { key: "name", label: "NAME", sortable: true },
    { key: "country", label: "COUNTRY", sortable: true },
    { key: "bill_card", label: "Bill Card", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "renews", label: "RENEWS", sortable: true },
    { key: "last_call_date", label: "LAST CALL DATE", sortable: true },
    { key: "campaign_name", label: "CAMPAIGN", sortable: true },
    { key: "number_pool", label: "NUMBER POOL", sortable: true },
    { key: "amount", label: "Amount", sortable: true },
    { key: "publisher_id", label: "PUBLISHER", sortable: true },
    { key: "status", label: "STATUS", sortable: true },
    { key: "actions" },
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
    console.log("this is the console log");
    refListTable.value.refresh();
  };

  watch(
    [currentPage, perPage, searchQuery, roleFilter, planFilter, statusFilter],
    () => {
      refetchData();
    }
  );
  const userData = getUserData()
  const fetchUsers = (ctx, callback) => {
    store
      .dispatch("manageNumbers/getNumbers", {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value == true ? false : true,
        role: userData.role == 'publisher' ? 'publisher' : ''
      })
      .then((response) => {
        const {
          data: {
            data: { numbers },
          },
        } = response;
        currentPage.value = numbers.current_page;
        totalUsers.value = numbers.total;
        perPage.value = numbers.per_page;

        callback(numbers.data);
        // totalUsers.value = Object.keys(data).length
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: "Error fetching users list",
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      });
  };
  const getCountries = (ctx, callback) => {
    store
      .dispatch("manageNumbers/getCountries")
      .then((response) => {})
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: "Error fetching Countries list",
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      });
  };
  const getPublishers = (ctx, callback) => {
    store
      .dispatch("manageNumbers/getPublishers", {
        type: "publisher",
      })
      .then((response) => {})
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: "Error fetching Publishers list",
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

  // const resolveUserStatusVariant = (status) => {
  //   if (status === "pending") return "warning";
  //   if (status === "active") return "success";
  //   if (status === "inactive") return "secondary";
  //   return "primary";
  // };

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

    // resolveUserRoleVariant,
    // resolveUserRoleIcon,
    // resolveUserStatusVariant,
    refetchData,
    getCountries,
    getPublishers,

    // Extra Filters
    roleFilter,
    planFilter,
    statusFilter,
  };
}
