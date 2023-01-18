<template>
    <div class="ag-contcenter-cards">
        <b-card v-if="tableData" class="card-company-table statistics-card h-100">
        <b-card-title class="font-weight-bolder pl-2 pt-2">
            Recent Call Logs
        </b-card-title>
        <b-table :items="tableData" responsive :fields="fields" class="mb-0 table-cc">
            <!-- id -->
            <template #cell(id)="data">
            <div>
                {{ data.item.id }}
            </div>
            </template>

            <!-- client-name -->
            <template #cell(client)="data">
            <div class="d-flex align-items-center">
                <b-avatar class="mr-1" :variant="data.item.avatarColor">
                <feather-icon size="18" :icon="data.item.avatarIcon" />
                </b-avatar>
                <span class="font-weight-bolder">{{
                    data.item.clientName
                }}</span>
            </div>
            </template>

            <!-- date -->
            <template #cell(date)="data">
            <div class="d-flex flex-column">
                <span class="font-weight-bold mb-25">{{ data.item.date }}</span>
            </div>
            </template>

            <!-- time -->
            <template #cell(time)="data">
            {{ data.item.time }}
            </template>

            <!-- duration -->
            <template #cell(duration)="data">
            <div class="d-flex align-items-center">
                <span>{{ data.item.duration }}</span>
            </div>
            </template>

            <!-- Status -->
            <template #cell(status)="data">
            <b-badge :variant="status[1][data.value]">
                {{ status[0][data.value] }}
            </b-badge>
            </template>
        </b-table>
        <p class="text-right m-2">
            <b-link class="mr-1 font-weight-bolder text-nero text-primary">
            <small class="font-weight-bolder">View All</small>
            </b-link>
            <img class="cursor-pointer" src="@/assets/images/icons/arrow-right.png" />
        </p>
        </b-card>
    </div>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BCardText,
  BLink,
  BFormGroup,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BMedia,
  BAvatar,
  BMediaAside,
  BMediaBody,
  BImg,
  BCardHeader,
  BCardBody,
  BCardTitle,
  BDropdown,
  BDropdownItem,
  BTable,
  BFormCheckbox,
  BBadge,
  BButton,
  BModal,
  BFormTextarea,
  BFormFile,
} from "bootstrap-vue";
export default {
    components:{
        BRow,
        BCol,
        BCard,
        BCardText,
        BLink,
        BFormGroup,
        BInputGroup,
        BFormInput,
        BInputGroupAppend,
        BMedia,
        BAvatar,
        BMediaAside,
        BMediaBody,
        BImg,
        BCardHeader,
        BCardBody,
        BCardTitle,
        BDropdown,
        BDropdownItem,
        BTable,
        BFormCheckbox,
        BBadge,
        BButton,
        BModal,
        BFormTextarea,
        BFormFile,
    },
    data(){
        return{
            fields: [
        { key: "id", label: "#" },
        { key: "client", label: "CLient Name" },
        { key: "date", label: "Date" },
        { key: "time", label: "Time" },
        { key: "duration", label: "Duration" },
        { key: "status", label: "Status" },
            ],
            stockData: [
                {
                device: "Total Calls",
                symbol: "BoxIcon",
                color: "text-primary",
                percentage: 80,
                upDown: 2,
                },
                {
                device: "Waiting Calls",
                symbol: "BoxIcon",
                color: "text-warning",
                percentage: 10,
                upDown: 8,
                },
                {
                device: "Drop Calls",
                symbol: "BoxIcon",
                color: "text-success",
                percentage: 10,
                upDown: -5,
                },
            ],
            tableData: [
                {
                id: 1,
                avatarIcon: "PhoneIncomingIcon",
                avatarColor: "light-success",
                clientName: "Esther Howard",
                date: "Today",
                time: "1:00",
                duration: "68:05",
                status: 2,
                },
                {
                id: 2,
                avatarIcon: "PhoneIncomingIcon",
                avatarColor: "light-danger",
                clientName: "Esther Howard",
                date: "Today",
                time: "1:00",
                duration: "68:05",
                status: 1,
                },
                {
                id: 3,
                avatarIcon: "PhoneIncomingIcon",
                avatarColor: "light-danger",
                clientName: "Esther Howard",
                date: "Today",
                time: "1:00",
                duration: "68:05",
                status: 3,
                },
                {
                id: 4,
                avatarIcon: "PhoneIncomingIcon",
                avatarColor: "light-success",
                clientName: "Esther Howard",
                date: "Today",
                time: "1:00",
                duration: "68:05",
                status: 2,
                },
                {
                id: 5,
                avatarIcon: "PhoneIncomingIcon",
                avatarColor: "light-success",
                clientName: "Esther Howard",
                date: "Today",
                time: "1:00",
                duration: "68:05",
                status: 2,
                },
                {
                id: 6,
                avatarIcon: "PhoneIncomingIcon",
                avatarColor: "light-danger",
                clientName: "Esther Howard",
                date: "Today",
                time: "1:00",
                duration: "68:05",
                status: 1,
                },
            ],
            status: [
                {
                1: "Warm",
                2: "Cold",
                3: "Hot",
                },
                {
                1: "light-primary",
                2: "light-success",
                3: "light-danger",
                },
            ],
        }
    }
}
</script>

<style>

</style>