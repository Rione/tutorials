<script setup>
    defineProps({
        progress: Number
    })
</script>

<template>
    <footer class="sticky bottom-1">
        <div class="w-auto p-2.5 rounded-md bg-neutral-700">
            <div v-if="progress === 100" class="w-auto rounded-full bg-neutral-100">
                <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-md font-bold text-neutral-100 text-center p-0.5 leading-none rounded-full" style="width: 100%">今回はここまで。お疲れ様でした!</div>
            </div>
            <div v-else class="w-auto rounded-full bg-neutral-800">
                <div class="bg-green-700 text-sm font-medium text-neutral-100 text-center p-0.5 leading-none rounded-full" :style="{ width: progress + '%' }"> {{ progress }}%</div>
            </div>
        </div>
    </footer>
</template>