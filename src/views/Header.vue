<template>
<nav class="flex items-center justify-between flex-wrap bg-black p-6 mb-10">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">Vue3 TypeScript</span>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center md:w-auto">
        <div class="text-sm md:flex-grow">
            <router-link to="/" class="block mt-4 md:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Home</router-link>
            <router-link to="/form" class="block mt-4 md:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Form</router-link>
        </div>
    </div>
</nav>
</template>

<script lang="ts">
import {
    Options,
    Vue
} from 'vue-class-component';

@Options({
    components: {},
})
export default class Header extends Vue {}
</script>
