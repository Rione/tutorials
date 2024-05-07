<script setup>
    import Lecture1 from './Lecture1.vue';
    import Lecture2 from './Lecture2.vue';

    defineProps({
        number: String
    })
</script>

<template>
    <h1 class="text-white">{{ number }}</h1>
    <!-- <Lecture1 v-if="$route.params.number === '1'"/> -->
    <!-- <Lecture2 v-else-if="$route.params.number === '2'"/> -->
</template>

<style scoped>
</style>