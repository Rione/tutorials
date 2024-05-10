<template>
    <div class="container mx-auto my-16">
        <div class="mx-16 text-start">
            <RouterLink class="p-2 rounded-md bg-green-700 hover:bg-green-600" :to="{ path: '/lecture/top' }">←トップへ戻る</RouterLink>
        </div>
        <h1 class="text-4xl"><slot></slot></h1>
    </div>
</template>