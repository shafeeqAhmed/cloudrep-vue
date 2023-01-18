<template>
    <span v-if="isNodeSourceIdExist > 0">
        <span v-if="isNodeSourceIdExist == 1">
            <span class="arrow-direction" :id="getId" @click="moveGotoNode(node.gotoSourceNodeId[0])">
                <feather-icon icon="CornerUpLeftIcon" size="21" />
            </span>
            <b-tooltip :target="getId" triggers="hover" placement="bottomright">
                Click to see the Goto source node.
            </b-tooltip>
        </span>

        <span v-else-if="isNodeSourceIdExist > 1">
            <span class="arrow-direction" v-b-toggle="getId" :id="getId">
                <feather-icon id="goto-direc" icon="CornerUpLeftIcon" size="21" />
            </span>
            <!-- <b-tooltip :target="getId" triggers="hover" placement="bottomright">
                Click to see the Goto source node.
            </b-tooltip> -->
            <b-tooltip target="goto-direc" triggers="focus" placement="bottomleft" :id="getId" class="">
                <div class="direction-btn-node">
                    <b-button v-for="(id, key) in node.gotoSourceNodeId" :key="key" @click="moveGotoNode(id)">
                        <span>
                            <feather-icon icon="CornerUpLeftIcon" size="21" />
                        </span>
                        <span>{{ getGoToNode(id) }}: Go to</span>
                    </b-button>
                </div>
            </b-tooltip>
        </span>

    </span>
</template>

<script>
import {
    VBToggle,
    BTooltip,
    BCollapse,
    BLink,
    BButton
} from "bootstrap-vue";
import { globalHelper } from "@core/mixins/ui/global";

export default {
    props: ['node'],
    components: {
        BTooltip,
        VBToggle,
        BCollapse,
        BLink,
        BButton
    },
    mixins: [globalHelper],

    directives: {
        "b-toggle": VBToggle,
    },
    data() {
        return {
            gotoSourceId: false
        }
    },
    watch: {
        node(newVal, oldVal) {

            console.log(newVal.gotoSourceNodeId)
        }
    },

    computed: {
        getId() {
            return `tooltip-id-${this.node.id}`
        },
        isNodeSourceIdExist() {
            return this.node.gotoSourceNodeId?.length
        },



        // getParentMenu() {
        //     if (Number.isInteger(this.node.type)) {
        //         return `On Press ${this.node.type}`
        //     } else {
        //         return `On ${this.node.type}`
        //     }
        // }
    },
    methods: {
        moveGotoNode(uuid) {
            this.gotoanynode(uuid)
            this.$root.$emit('bv::show::tooltip', this.getId)
        },
        getGoToNode(id) {
            const nodes = this.$store.state.ivrBuilder.nodes
            const node = nodes.filter(el => {
                return el.id == id
            })
            if (node.length > 0) {
                const type = node[0].type
                if (Number.isInteger(type)) {
                    return `On Press ${type}`
                } else {
                    return `On ${type}`
                }
            } else {
                return ''
            }
        }


    },
    created() {

    }
}
</script> 

<style scoped lang="scss">
#tooltip-id-1 {
    .tooltip-inner {
        background-color: #161D31;
    }
}
</style>










