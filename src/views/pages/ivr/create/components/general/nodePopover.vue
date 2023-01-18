<template>
    <div>
        <div class="">
            <div class="">
                <b-button :id="popOverId" class="popover-btn" @click="onOpen(parentId)"> {{ label }}
                    <span class="ml-1">+</span>
                </b-button>
            </div>
            <b-popover triggers="blur" :target="popOverId" v-if="activeParentId === parentId" :show.sync="show"
                class="m-3">

                <div class="d-flex flex-column popover-ivr-btn">
                    <div class="input-gradient">
                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" @click="add(parentId, 'Dial')" size="sm"
                            variant="primary" class="d-flex align-items-center">
                            <div class="ivr-node-icon mr-1">
                                <feather-icon icon='PhoneCallIcon' size='21' />
                            </div>
                            Dail
                        </b-button>
                    </div>
                    <div class="input-gradient">
                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" @click="add(parentId, 'Gather')" size="sm"
                            variant="primary" class="d-flex align-items-center">
                            <div class="ivr-node-icon mr-1">
                                <feather-icon icon='GridIcon' size='21' />
                            </div>
                            Gather
                        </b-button>
                    </div>
                    <div class="input-gradient">
                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" @click="add(parentId, 'Go To')" size="sm"
                            variant="primary" class="d-flex align-items-center">
                            <div class="ivr-node-icon mr-1">
                                <feather-icon icon='RepeatIcon' size='21' />
                            </div>
                            Go To
                        </b-button>
                    </div>
                    <div class="input-gradient">
                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" @click="add(parentId, 'Hangup')" size="sm"
                            variant="primary" class="d-flex align-items-center">
                            <div class="ivr-node-icon mr-1">
                                <feather-icon icon='PhoneIcon' size='21' />
                            </div>
                            Hangup
                        </b-button>
                    </div>
                    <div class="input-gradient">
                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" @click="add(parentId, 'Menu')" size="sm"
                            variant="primary" class="d-flex align-items-center">
                            <div class="ivr-node-icon mr-1">
                                <feather-icon icon='AlignLeftIcon' size='21' />
                            </div>
                            Menu
                        </b-button>
                    </div>
                    <div class="input-gradient">
                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" @click="add(parentId, 'Play')" size="sm"
                            variant="primary" class="d-flex align-items-center">
                            <div class="ivr-node-icon mr-1">
                                <feather-icon icon='PlayIcon' size='21' />
                            </div>
                            Play
                        </b-button>
                    </div>
                    <div class="input-gradient">
                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" @click="add(parentId, 'Voicemail')"
                            size="sm" variant="primary" class="d-flex align-items-center">
                            <div class="ivr-node-icon mr-1">
                                <feather-icon icon='Volume2Icon' size='21' />
                            </div>
                            Voicemail
                        </b-button>
                    </div>
                    <div class="input-gradient">
                        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" @click="add(parentId, 'Router')" size="sm"
                            variant="primary" class="d-flex align-items-center">
                            <div class="ivr-node-icon mr-1">
                                <feather-icon icon='Share2Icon' size='21' />
                            </div>
                            Router
                        </b-button>
                    </div>
                </div>
            </b-popover>
        </div>
    </div>
</template>

<script>
import { BPopover, BButton } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
    props: ['label', 'parentId', 'popOverId', 'type'],
    directives: {
        Ripple,
    },
    components: {
        BPopover, BButton
    },
    data() {
        return {
            show: false,
        }
    },
    computed: {
        activeParentId() {
            return this.$store.state.ivrBuilder.activeParentId
        },
    },
    methods: {
        onOpen(parentId) {
            this.$store.commit('ivrBuilder/UPDATE_ACTIVE_PARENT_ID', parentId)
            this.show = !this.show
        },
        onClose() {
            this.show = false
        },
        add(parentId, title) {
            this.$store.commit('ivrBuilder/UPDATE_NEW_NODE', { parentId: parentId, title: title, type: this.type })
            this.show = false
            this.$emit('selectNode', this.type)
        },
    },
}
</script> 












