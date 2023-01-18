<template>
    <div>
        <b-row>
            <b-col cols="12">
                <div class="rep_collapse_header rep_camp_header mb-1">
                    <h2 class="cursor-pointer" @click="$emit('toggleTab', name)">{{ heading }} <span class="text-danger"> *</span></h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" role="presentation"
                        class="cursor-pointer" @click="$emit('toggleTab', name)">
                        <path
                            d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z">
                        </path>
                    </svg>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import {
    BRow,
    BCol,
} from "bootstrap-vue";

export default {
    props: ['heading', 'name'],
    components: {
        BRow,
        BCol,
    },
    watch:{

    }

};
</script>
