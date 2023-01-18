<template>
    <div>
        <draggable v-model="items">
            <div v-for="item in items" :key="item.id">{{ item.name }}</div>
        </draggable>
    </div>
</template>

<script>
import draggable from 'vuedraggable'


export default {
    name: "hello",
    components: {
        draggable
    },
    data() {
        return {
            items: [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' },
                { id: 3, name: 'Item 3' }
            ]
        };
    },
};
</script>

<style>
.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.list-group {
    min-height: 20px;
}

.list-group-item {
    cursor: move;
}

.list-group-item i {
    cursor: pointer;
}
</style>