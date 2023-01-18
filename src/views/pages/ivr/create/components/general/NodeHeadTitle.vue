<template>
    <span>
        <span v-if="node.parentId != -1">{{ getParentMenu }}: </span>
        <span>{{ node.data.title }}</span>
    </span>
</template>

<script>

export default {
    props: ['node'],
    computed: {
        getParentMenu() {
            console.log('-------------------node test----------------------')
            console.log(this.node)

            const parent = this.$store.getters['ivrBuilder/getParentNode'](this.node.id)

            if (parent.node_type == 'router') {
                return `On Route ${this.node.type}`
            } else {
                if (Number.isInteger(this.node.type)) {
                    return `On Press ${this.node.type}`
                } else {
                    return `On ${this.node.type}`
                }
            }

        }
    },

};
</script>
