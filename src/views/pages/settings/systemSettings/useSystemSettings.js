import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useSystemSettings() {
    // Use toast
    const toast = useToast()

    const refUserListTable = ref(null)
    const refDropdowntest = ref(null)

    // Table Handlers
    const tableColumns = [
        { key: "name", label: "Name", sortable: true },
        { key: "value", label: "Value", sortable: true },
        { key: 'actions' },
    ]
    const perPage = ref(10)
    const totalUsers = ref(0)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const searchQuery = ref('')
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)

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
    }

    watch([currentPage, perPage, searchQuery, refDropdowntest], () => {
        refetchData()
    })

    const fetchSystemSettings = (ctx, callback) => {
        store
            .dispatch('systemSettings/fetchSystemSettings',{
                q: searchQuery.value,
                perPage: perPage.value,
                page: currentPage.value,
                sortBy: sortBy.value,
                sortDesc: isSortDirDesc.value == true ? false : true,
            })
            .then(response => {
                
                const data = response.data.data.settings
                currentPage.value = data.current_page
                totalUsers.value = data.total
                perPage.value = data.per_page
                callback(response.data.data.settings.data)
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

    return {
        fetchSystemSettings,
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
        
        refetchData,
        refDropdowntest
        
    }
}
