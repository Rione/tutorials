<script setup>
    import Lecture1 from './Lecture1.vue';
    import Lecture2 from './Lecture2.vue';
    import Lecture3 from './Lecture3.vue';
    import Lecture4 from './Lecture4.vue';
    import Answer from './Answer.vue';
    import WorkInProgress from './WorkInProgress.vue'
    import NotExisting from './NotExisting.vue';
</script>

<template>
    <Lecture1 v-if="$route.params.number === '1'"/>
    <Lecture2 v-else-if="$route.params.number === '2'"/>
    <Lecture3 v-else-if="$route.params.number === '3'"/>
    <Lecture4 v-else-if="$route.params.number === '4'"/>
    <WorkInProgress v-else-if="$route.params.number === '5'" />
    <WorkInProgress v-else-if="$route.params.number === '6'" />
    <Answer v-else-if="$route.params.number === '7'" />
    <NotExisting v-else />
</template>