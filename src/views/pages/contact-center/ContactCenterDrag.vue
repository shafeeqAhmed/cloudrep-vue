<template>
    <div>
        <b-row class="mb-3">
            <b-col md="8">
                <p class="user-message">Hi {{ user.name }},</p>
                <h1>Welcome to Cloud Rep!</h1>
            </b-col>

            <!-- search-bar -->
            <b-col md="4">
                <div class="input-gradient">
                    <b-input-group class="input-group-merge">
                        <b-form-input placeholder="Search" />
                        <b-input-group-append is-text>
                            <feather-icon icon="SearchIcon" class="text-muted" />
                        </b-input-group-append>
                    </b-input-group>
                </div>
            </b-col>
        </b-row>
        <div class="ag-contact-center">
            <grid-layout :layout.sync="layout" :col-num="12" :row-height="30" :is-draggable="draggable"
                :is-resizable="resizable" :responsive="responsive" :vertical-compact="true" :use-css-transforms="true">
                <grid-item v-for="(item, key) in layout" :key="key" :x="item.x" :y="item.y" :w="item.w" :h="item.h"
                    :i="item.i" :maxW="item.maxW" :maxH="item.maxH" :minW="item.minW" :minH="item.minH"
                    drag-allow-from=".vue-draggable-handle" drag-ignore-from=".no-drag">
                    <div class="text">
                        <div class="vue-draggable-handle">
                            <svg data-v-a8b82b76="" width="36" height="36" viewBox="0 0 36 36" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g data-v-a8b82b76="" opacity="0.3" clip-path="url(#clip0_4450_16776)">
                                    <path data-v-a8b82b76=""
                                        d="M12 25.5C12.8284 25.5 13.5 24.8284 13.5 24C13.5 23.1716 12.8284 22.5 12 22.5C11.1716 22.5 10.5 23.1716 10.5 24C10.5 24.8284 11.1716 25.5 12 25.5Z"
                                        fill="white"></path>
                                    <path data-v-a8b82b76=""
                                        d="M18 25.5C18.8284 25.5 19.5 24.8284 19.5 24C19.5 23.1716 18.8284 22.5 18 22.5C17.1716 22.5 16.5 23.1716 16.5 24C16.5 24.8284 17.1716 25.5 18 25.5Z"
                                        fill="white"></path>
                                    <path data-v-a8b82b76=""
                                        d="M18 19.5C18.8284 19.5 19.5 18.8284 19.5 18C19.5 17.1716 18.8284 16.5 18 16.5C17.1716 16.5 16.5 17.1716 16.5 18C16.5 18.8284 17.1716 19.5 18 19.5Z"
                                        fill="white"></path>
                                    <path data-v-a8b82b76=""
                                        d="M24 13.5C24.8284 13.5 25.5 12.8284 25.5 12C25.5 11.1716 24.8284 10.5 24 10.5C23.1716 10.5 22.5 11.1716 22.5 12C22.5 12.8284 23.1716 13.5 24 13.5Z"
                                        fill="white"></path>
                                    <path data-v-a8b82b76=""
                                        d="M24 25.5C24.8284 25.5 25.5 24.8284 25.5 24C25.5 23.1716 24.8284 22.5 24 22.5C23.1716 22.5 22.5 23.1716 22.5 24C22.5 24.8284 23.1716 25.5 24 25.5Z"
                                        fill="white"></path>
                                    <path data-v-a8b82b76=""
                                        d="M24 19.5C24.8284 19.5 25.5 18.8284 25.5 18C25.5 17.1716 24.8284 16.5 24 16.5C23.1716 16.5 22.5 17.1716 22.5 18C22.5 18.8284 23.1716 19.5 24 19.5Z"
                                        fill="white"></path>
                                </g>
                                <defs data-v-a8b82b76="">
                                    <clipPath data-v-a8b82b76="" id="clip0_4450_16776">
                                        <rect data-v-a8b82b76="" width="36" height="36" fill="white"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <component v-bind:is=item.component></component>
                    </div>
                </grid-item>
            </grid-layout>
        </div>
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
import { GridLayout, GridItem } from "vue-grid-layout";
import DailPad from './DailPad.vue'
import UserCard from './drag-components/UserCard.vue'
import UserStatCard from './drag-components/UserStatCard.vue'
import RecentCallLogCard from './drag-components/RecentCallLogCard.vue'
import LiveChatCard from './drag-components/LiveChatCard.vue'
import { getUserData } from '@/auth/utils'
export default {
    components: {
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
        GridLayout,
        GridItem,
        DailPad,
        UserCard,
        UserStatCard,
        RecentCallLogCard,
        LiveChatCard,
    },
    data() {
        return {
            layout: [
                { "x": 0, "y": 0, "w": 4, "h": 22, "i": "0", component: DailPad },
                { "x": 4, "y": 0, "w": 8, "h": 7, "i": "1", component: UserCard },
                { "x": 4, "y": 0, "w": 8, "h": 15, "i": "2", component: UserStatCard },
                { "x": 0, "y": 0, "w": 8, "h": 18, "i": "3", component: RecentCallLogCard },
                { "x": 8, "y": 0, "w": 4, "h": 13, "i": "4", component: LiveChatCard },
            ],
            draggable: true,
            resizable: false,
            // responsive: true,
            index: 0,
            eventLog: []
        };
    },
    watch: {
        eventLog: function () {
            const eventsDiv = this.$refs.eventsDiv;
            eventsDiv.scrollTop = eventsDiv.scrollHeight;
        }
    },
    methods: {

    },
    created() {
        this.user = getUserData()
    },
}
</script>

<style lang="scss">
.vue-grid-layout {
    background: transparent;
}

.vue-grid-item:not(.vue-grid-placeholder) {
    background: transparent;
    box-shadow: 0 4px 24px 0 rgb(34 41 47 / 24%);
    background: #fff;
    border: 1px solid #fff;
    border-radius: 20px;

    .card {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
    }
}

.vue-grid-item .resizing {
    opacity: 0.9;
}

.vue-grid-item .static {
    background: #cce;
}

.vue-grid-item .text {
    // font-size: 24px;
    // text-align: center;
    // position: absolute;
    // top: 0;
    // bottom: 0;
    // left: 0;
    // right: 0;
    // margin: auto;
    // height: 100%;
    // width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}

.ag-contcenter-cards {
    height: 100%;
    width: 100%;

    .card {
        height: 100%;
        width: 100%;
    }
}

.vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}

.vue-grid-item .minMax {
    font-size: 12px;
}

.vue-grid-item .add {
    cursor: pointer;
}

.vue-draggable-handle {
    position: absolute;
    z-index: 5;
    top: 0;
    right: 0;
    padding: 0 8px 8px 0;
    cursor: move;
    color: #fff;

    svg {
        transform: rotate(270deg);
        stroke: #000;
    }
}

.layoutJSON {
    background: #ddd;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
}

.eventsJSON {
    background: #ddd;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
    height: 100px;
    overflow-y: scroll;
}

.dark-layout {
    .vue-grid-item:not(.vue-grid-placeholder) {
        background: transparent;
        box-shadow: 0 4px 24px 0 rgb(34 41 47 / 24%);
        background: #2D3345;
        border: 1px solid #2D3345;

        .card {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
        }
    }

    .vue-draggable-handle {
        color: #fff;

        svg {
            stroke: #fff;
        }
    }
}
</style>