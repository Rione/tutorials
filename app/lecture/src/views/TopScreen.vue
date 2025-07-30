<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter()
    const lectures = ([
        {"title": "Python: データ型、変数、演算子"},
        {"title": "Python: if文、for文、while文"},
        {"title": "Python: 配列、辞書"},
        {"title": "Python: 関数、ライブラリ"},
        {"title": "Linux: 概要、Linuxコマンド"},
        {"title": "Git: 概要、Gitコマンド"},
    ])

    const output = ref('');
    const oneOriented = (num) => Number(num) + 1;
    const navigate = (index) => {
        router.push({
            name: 'lecture',
            params: {
                number: oneOriented(index)
            } 
        })
    }

    const html_text = "Ri-oneの<span id='target'>新入生歓迎講座</span>へようこそ！"
    const conv_text = "Ri-oneの新入生歓迎講座へようこそ！";
    const orig_text = "Ri-oneれんごうのしんにゅうせいかんげいこうざへようこそ！";
    const speed     = 130; // Typing speed in milliseconds
    var index       = 0;

    function typeNextCharacter() {
        output.value += (orig_text[index]);
        index++;
        if (index < orig_text.length) {
            if (index == 14){
                output.value = (conv_text.slice(0, 11));
            } else if (index == 18){
                output.value = (conv_text.slice(0, 13));
            } else if (index == 22){
                output.value = (conv_text.slice(0, 15));
            }
            setTimeout(typeNextCharacter, speed);
        } else if (index == orig_text.length) {
            output.value = html_text;
        }
    };

    let isScrolling = false;

    function startScrolling() {
            isScrolling = true;
            var scrollText = document.getElementById('scroll-text');
            var scrollContainer = document.getElementById('scroll-container');
            var containerWidth = scrollContainer.offsetWidth;
            var textWidth = scrollText.offsetWidth;

            // Reset position
            scrollText.style.left = containerWidth + 'px';

            function animate() {
                if (!isScrolling) return;
                var currentLeft = parseFloat(scrollText.style.left);
                scrollText.style.left = (currentLeft - 2) + 'px'; // Adjust speed by changing 2
                if (currentLeft + textWidth > 0) {
                    requestAnimationFrame(animate);
                } else {
                    startScrolling(); // Repeat animation
                }
            }
            requestAnimationFrame(animate);
        }

    function stopScrolling() {
        isScrolling = false;
    }

    onMounted(() => {
        typeNextCharacter();
        startScrolling();
    });

    onUnmounted(() => {
        stopScrolling()
        output.value = "";
    });
</script>

<template>
    <div class="container mx-auto my-16">
        <h1 v-html="output" id="output" class="text-5xl"></h1><span class="typing-cursor"></span>
        <!-- <div class="mt-2">※レスポンシブ非対応なのは内緒です。だって面倒くさ(ry</div> -->
        <div id="scroll-container" class="mx-auto w-4/6 mt-2">
            <div id="scroll-text" class="text-md">
                企画・開発：reina314（<a href="https://rione.org" target="_blank" style="color: yellow; text-decoration: none;">Ri-one</a>） ホスティング：<a href="https://rione.org" target="_blank" style="color: yellow; text-decoration: none;">Ri-one</a>（tutorials.rione.org）
            </div>
        </div>
    </div>

    

    <table class="mx-auto mt-20 w-full sm:w-5/6 md:w-4/6 bg-neutral-900 rounded-lg border-2 border-solid border-green-700">
        <div class="flex-col space-y-0 space-x-0 text-start divide-y divide-green-600">
            <div v-for="(lecture, index) in lectures" class="w-full py-5 pl-5 hover:bg-green-600 hover:scale-105" @click="navigate(index)">
                第{{ oneOriented(index) }}講 {{ lecture.title }}
            </div>
            <div class="w-full py-5 pl-5 hover:bg-green-600 hover:scale-105" @click="navigate(7 - 1)">演習問題 解答・解説</div>
        </div>
    </table>
</template>

<style>
    #target {
        animation: changeColor forwards 3s 1;
    }

    #output {
        display: inline-block;
    }

    #scroll-container {
        overflow: hidden;
        white-space: nowrap;
        box-sizing: border-box;
        text-align: center; /* 子要素を中央揃え */
    }

    #scroll-text {
        display: inline-block; /* 中央揃えのためにインラインブロックに設定 */
        position: static; /* スクロールを無効化 */
        text-align: center;
    }

    .typing-cursor {
        display: inline-block;
        width: 15px;
        height: 50px;
        background-color: white;
        animation: blink 1.5s infinite;
    }
    
    @keyframes blink {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }

    @keyframes changeColor {
        0% { color: #ffffff; }
        100% { color: #dc3545; }
    }
</style>