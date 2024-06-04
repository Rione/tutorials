<script setup>
    const props = defineProps({
        unique_id: {
            type: String,
            default: '',
        },
        language: {
            type: String,
            default: '',
        },
        content: {
            type: String,
            default: '',
        },
    })

    $(document).ready(function() {
        $('#success-icon-' + props.unique_id).hide();

        $("#btn-" + props.unique_id).click(() => {
            if (navigator.clipboard) {
                return navigator.clipboard.writeText(props.content).then(() => {
                    $("#default-icon-" + props.unique_id).hide();
                    $("#success-icon-" + props.unique_id).show();

                    $("#success-icon-" + props.unique_id).fadeOut(2000, function() {
                        $("#default-icon-" + props.unique_id).show();
                    });
                })
            } else {
                alert("Your browser does not support clipboard-copy!");
            }
        })
    })
</script>

<template>
    <div class="py-3">
        <div class="container bg-black-800 border border-green-600 rounded my-3 px-3 py-3">
            <p class="-mt-2 text-sm">{{ language }}</p>
            <div id="text" class="relative px-3 py-2 rounded bg-white text-black">
                <slot></slot>
                <button :id="'btn-' + unique_id" class="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center">
                    <span :id="'default-icon-' + unique_id">
                        <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                        </svg>
                    </span>
                    <span :id="'success-icon-' + unique_id" class="inline-flex items-center">
                        <svg class="w-3.5 h-3.5 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #text {
        font-family: monospace;
        font-size: large;
    }
</style>