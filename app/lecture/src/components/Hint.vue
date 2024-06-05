<script setup>
    const props = defineProps({
        unique_id: {
            type: String,
            default: '',
        },
    })

    $(document).ready(function() {
        $('div.hint').hide();

        // When a hint button clicked
        $('#hint-' + props.unique_id + '-btn').click(function() {
            var button = $(this)
            var targetValue = button.attr('target');

            if (!$(targetValue).is(':visible')) {
                button.text('ヒントを隠す').removeClass('bg-green-700 hover:bg-green-600').addClass('bg-neutral-600 hover:bg-neutral-500');
            } else {
                button.text('ヒントを見る').removeClass('bg-neutral-600 hover:bg-neutral-500').addClass('bg-green-700 hover:bg-green-600');
            }
            $(targetValue).fadeToggle(800);
        });
    });
</script>

<template>
    <div class="mx-5">
        <button :id="'hint-' + unique_id + '-btn'" class="rounded p-1 bg-green-700 hover:bg-green-600" :target="'#hint-' + unique_id">ヒントを見る</button>
        <div :id="'hint-' + unique_id" class="hint">
            <p>Hint: <slot></slot></p>
        </div>
    </div>
</template>