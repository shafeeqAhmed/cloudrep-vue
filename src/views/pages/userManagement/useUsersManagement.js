import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useUsersManagement() {

    // Use toast
    const toast = useToast()

    const refUserListTable = ref(null)

    const tableColumns = [
        { key: "first_name", label: "First Name", sortable: true },
        { key: "last_name", label: "Last Name", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "phone_no", label: "Phone", sortable: true },
        // { key: "start_date", label: "Join Date", sortable: true },
        // { key: "activity", label: "Activity", sortable: true },
    ]

    const perPage = ref(10)
    const totalUsers = ref(0)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const searchQuery = ref('')
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)


    //  q: searchQuery.value,
    // perPage: perPage.value,
    // page: currentPage.value,
    // sortBy: sortBy.value,
    // sortDesc: isSortDirDesc.value,
    const fetchAgents = (ctx, callback) => {
        store
            .dispatch('app-user/fetchAgents')
            .then(response => {
                const users = response.data.data

                callback(users)
                console.log(users)
                // totalUsers.value = total
            })
            .catch(() => {
                toast({
                    component: ToastificationContent,
                    props: {
                        title: 'Error fetching users list',
                        icon: 'AlertTriangleIcon',
                        variant: 'danger',
                    },
                })
            })
    }

    const fetchClients = (ctx, callback) => {
        store
            .dispatch('app-user/fetchClients')
            .then(response => {
                const { users, total } = response.data

                callback(users)
                totalUsers.value = total
            })
            .catch(() => {
                toast({
                    component: ToastificationContent,
                    props: {
                        title: 'Error fetching users list',
                        icon: 'AlertTriangleIcon',
                        variant: 'danger',
                    },
                })
            })
    }

    const fetchPublishers = (ctx, callback) => {
        store
            .dispatch('app-user/fetchPublishers')
            .then(response => {
                const { users, total } = response.data

                callback(users)
                totalUsers.value = total
            })
            .catch(() => {
                toast({
                    component: ToastificationContent,
                    props: {
                        title: 'Error fetching users list',
                        icon: 'AlertTriangleIcon',
                        variant: 'danger',
                    },
                })
            })
    }

    const resolveUserStatusVariant = status => {
        if (status === 'pending') return 'warning'
        if (status === 'active') return 'success'
        if (status === 'inactive') return 'secondary'
        return 'primary'
    }

    // const getUsers = async () => {
    //     let response = await axios.get('/api/user');
    //     users.value = response;
    // }

    return {
        fetchAgents,
        fetchClients,
        fetchPublishers,
        tableColumns,
        perPage,
        currentPage,
        totalUsers,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refUserListTable,

        resolveUserStatusVariant,
    }
}