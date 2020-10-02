<template>
<div>
    <Header></Header>
    <router-view></router-view>
</div>
</template>

<script lang="ts">
import Header from '@/views/Header.vue';

import {
    Options,
    Vue
} from 'vue-class-component';

@Options({
    components: {
        Header
    },
})
export default class App extends Vue {}
</script>
