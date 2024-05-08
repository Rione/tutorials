<template>
    <div class="container bg-black-800 border border-green-600 rounded mt-3 px-3 py-3">
        <p class="text-md">Python3.11</p>
        <div class="px-3 rounded bg-white text-black">
            <py-repl>
                <slot></slot>
            </py-repl>
        </div>
    </div>
</template>