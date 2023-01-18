import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useCampaignList() {
    // Use toast
    const toast = useToast()

    const refUserListTable = ref(null)

    // Table Handlers
    const tableColumns = [
        { key: "name", label: "Name", sortable: true },
        { key: "calls", label: "Calls", sortable: true },
        { key: "converted", label: "Converted", sortable: true },
        { key: 'revenue', label: "Revenue" },
    ]
    const perPage = ref(10)
    const totalUsers = ref(0)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const searchQuery = ref('')
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)
    const roleFilter = ref(null)
    const planFilter = ref(null)
    const statusFilter = ref(null)
    const onChangeRefetch = ref(0)

    const dataMeta = computed(() => {
        const localItemsCount = refUserListTable.value ? refUserListTable.value.localItems.length : 0
        return {
            from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
            to: perPage.value * (currentPage.value - 1) + localItemsCount,
            of: totalUsers.value,
        }
    })

    const refetchData = () => {
        refUserListTable.value.refresh()
    }

    watch([currentPage, perPage, searchQuery, roleFilter, planFilter, statusFilter, onChangeRefetch], () => {
        refetchData()
    })

    const fetchTargets = (ctx, callback) => {

        store
            .dispatch('manageClientReporting/getTopPerformers', {
                q: searchQuery.value,
                perPage: perPage.value,
                page: currentPage.value,
                sortBy: sortBy.value,
                sortDesc: isSortDirDesc.value == true ? false : true,
                role: roleFilter.value,
                plan: planFilter.value,
                status: statusFilter.value,
                type:'target'
            })
            .then(response => {

                  const{
                    data:{
                        data:{topPerformers}
                    }
                  }=response;

                currentPage.value = topPerformers.current_page
                totalUsers.value = topPerformers.total
                perPage.value = topPerformers.per_page
                callback(topPerformers)
            })
            .catch(() => {
                toast({
                    component: ToastificationContent,
                    props: {
                        title: 'Error fetching Target list',
                        icon: 'AlertTriangleIcon',
                        variant: 'danger',
                    },
                })
            })
    }
    return {
        fetchTargets,
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
        onChangeRefetch,
        refetchData,
        // Extra Filters
        roleFilter,
        planFilter,
        statusFilter,
    }
}