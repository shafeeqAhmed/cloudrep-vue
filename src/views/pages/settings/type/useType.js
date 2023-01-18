import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useType() {
    // Use toast
    const toast = useToast()

    const refUserListTable = ref(null)
    const refDropdowntest = ref(null)

    // Table Handlers
    const tableColumns = [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: 'actions' },
    ]
    const perPage = ref(10)
    const totalUsers = ref(0)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const searchQuery = ref('')
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)
    // const roleFilter = ref(null)
    // const planFilter = ref(null)
    // const statusFilter = ref(null)

    const dataMeta = computed(() => {
        const localItemsCount = refUserListTable.value ? refUserListTable.value.localItems.length : 0
        return {
            from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
            to: perPage.value * (currentPage.value - 1) + localItemsCount,
            of: totalUsers.value,
        }
    })

    const refetchData = () => {
        console.log('this is the console log')
        refUserListTable.value.refresh()
        // fetchDropdowns()
    }

    watch([currentPage, perPage, searchQuery, refDropdowntest], () => {
        refetchData()
    })

    const fetchTypes = (ctx, callback) => {
        store
            .dispatch('type/fetchTypes',{
                q: searchQuery.value,
                perPage: perPage.value,
                page: currentPage.value,
                sortBy: sortBy.value,
                sortDesc: isSortDirDesc.value == true ? false : true,
            })
            .then(response => {
                // console.log('fetchTypes dispatch ----------------------')
                // console.log(response.data)
                // return false
                const data = response.data.data.types
                currentPage.value = data.current_page
                totalUsers.value = data.total
                perPage.value = data.per_page
                // refDropdowntest = 1
                callback(response.data.data.types.data)
                // totalUsers.value = Object.keys(data).length
            })
            .catch(() => {
                toast({
                    component: ToastificationContent,
                    props: {
                        title: 'Error fetching Dropdown list',
                        icon: 'AlertTriangleIcon',
                        variant: 'danger',
                    },
                })
            })
    }

    // *===============================================---*
    // *--------- UI ---------------------------------------*
    // *===============================================---*

    // const resolveUserRoleVariant = role => {
    //     if (role === 'subscriber') return 'primary'
    //     if (role === 'author') return 'warning'
    //     if (role === 'maintainer') return 'success'
    //     if (role === 'editor') return 'info'
    //     if (role === 'admin') return 'danger'
    //     return 'primary'
    // }

    // const resolveUserRoleIcon = role => {
    //     if (role === 'subscriber') return 'UserIcon'
    //     if (role === 'author') return 'SettingsIcon'
    //     if (role === 'maintainer') return 'DatabaseIcon'
    //     if (role === 'editor') return 'Edit2Icon'
    //     if (role === 'admin') return 'ServerIcon'
    //     return 'UserIcon'
    // }

    // const resolveUserStatusVariant = status => {
    //     if (status === 'pending') return 'warning'
    //     if (status === 'active') return 'success'
    //     if (status === 'inactive') return 'secondary'
    //     return 'primary'
    // }

    return {
        fetchTypes,
        tableColumns,
        perPage,
        currentPage,
        totalUsers,
        dataMeta,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refUserListTable,

        // resolveUserRoleVariant,
        // resolveUserRoleIcon,
        // resolveUserStatusVariant,
        refetchData,
        refDropdowntest

        // Extra Filters
        // roleFilter,
        // planFilter,
        // statusFilter,
    }
}
