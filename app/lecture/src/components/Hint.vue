<script setup>
    const props = defineProps({
        level: String
    })

    $(document).ready(function() {
        $('div.hint').hide();

        // When a hint button clicked
        $('#hint-' + props.level + '-btn').click(function() {
            var button = $(this)
            var targetValue = button.attr('target');

            if (!$(targetValue).is(':visible')) {
                button.text('ヒントを隠す').removeClass('bg-green-600 hover:bg-green-500').addClass('bg-neutral-600 hover:bg-neutral-500');
            } else {
                button.text('ヒントを見る').removeClass('bg-neutral-600 hover:bg-neutral-500').addClass('bg-green-600 hover:bg-green-500');
            }
            $(targetValue).fadeToggle(800);
        });
    });
</script>

<template>
    <div class="mx-5">
        <button :id="'hint-' + level + '-btn'" class="rounded p-1 bg-green-600 hover:bg-green-500" :target="'#hint-' + level">ヒントを見る</button>
        <div :id="'hint-' + level" class="hint">
            <p>Hint: <slot></slot></p>
        </div>
    </div>
</template>