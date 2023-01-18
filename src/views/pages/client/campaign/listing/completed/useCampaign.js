import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useCampaign() {
    // Use toast
    const toast = useToast()

    const refUserListTable = ref(null)
    const refDropdowntest = ref(null)

    // Table Handlers
    const tableColumns = [
        { key: "state", label: "State", sortable: true },
        { key: "campaign_name", label: "Name", sortable: true },
        { key: "country", label: "Country", sortable: true },
        // { key: "recording", label: "Recording", sortable: true },
        { key: "status", label: "Status", sortable: true },
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
        // console.log('this is the console log')
        refUserListTable.value.refresh()
        // fetchCampaigns()
    }

    watch([currentPage, perPage, refDropdowntest], () => {
        refetchData()
    })

    const fetchCampaigns = (ctx, callback) => {
        store.commit('app/UPDATE_LOADER', true)
        store
            .dispatch('campaign/fetchCompletedCampaigns', {
                q: searchQuery.value,
                perPage: perPage.value,
                page: currentPage.value,
                sortBy: sortBy.value,
                sortDesc: isSortDirDesc.value == true ? false : true,
            })
            .then(response => {

                const data = response.data.data.campaigns
                currentPage.value = data.current_page
                totalUsers.value = data.total
                perPage.value = data.per_page
                // console.log(response.data.data.campaigns.data)
                callback(response.data.data.campaigns.data)
            })
            .catch(() => {
                toast({
                    component: ToastificationContent,
                    props: {
                        title: 'Error fetching Campaign list',
                        icon: 'AlertTriangleIcon',
                        variant: 'danger',
                    },
                })
            }).finally(() => {
                store.commit('app/UPDATE_LOADER', false)
            });
    }

    return {
        fetchCampaigns,
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
