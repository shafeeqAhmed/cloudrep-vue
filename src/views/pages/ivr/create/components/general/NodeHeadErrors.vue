<template>
    <span>
        <div :id="`${node.type}-evrError-${node.id}`" class="ivr-note-box ivrError">
            <feather-icon icon="AlertTriangleIcon" class="text-white IVRAlertTriangleIcon" size="27" />
            <span class="error-count">{{ Object.keys(getErrors).length }}</span>
        </div>

        <b-tooltip :target="`${node.type}-evrError-${node.id}`" triggers="hover" placement="bottomright">
            <div class="ivr-note-box">
                <div class="ivrErrorContainer">
                    <div class="ivrError-content mt-1">
                        <span v-for="(error, key) in getErrors" class="d-flex align-items-center mb-1">
                            <feather-icon icon="AlertTriangleIcon" class="mr-1" size="21" />
                            <p> {{ error }}</p>
                        </span>
                    </div>
                </div>
            </div>
        </b-tooltip>
    </span>
</template>

<script>

export default {
    props: ['node'],
    computed: {
        getErrors() {
            return this.$store.getters['ivrBuilder/getErrors'](this.node.id)
        },
    },

};
</script>
