<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import Title from '../components/Title.vue';
    import Header from '../components/Header.vue';
    import SubHeader from '../components/SubHeader.vue';
    import Paragraph from '../components/Paragraph.vue';
    import PyScript from '../components/PyScript.vue';
    import Hint from '../components/Hint.vue';
    import ProgressFooter from '../components/ProgressFooter.vue';

    const completion = ref(0);

    const updateScrollCompletion = () => {
        const currentProgress = window.scrollY;
        const scrollHeight = document.body.scrollHeight - window.innerHeight;
        if (scrollHeight) {
            completion.value = Math.round((currentProgress / scrollHeight) * 100);
            if (completion.value > 100) {
                completion.value = 100;
            }
        }
    };

    onMounted(() => {
        window.addEventListener("scroll", updateScrollCompletion);
    });

    onUnmounted(() => {
        window.removeEventListener("scroll", updateScrollCompletion);
    });
</script>

<template>
    <Title>第1講 Python: データ型、変数、演算子</Title>

    <div class="container w-full sm:w-5/6 md:w-4/6 mx-auto mb-10 text-start">
        <Header>1.データ型</Header>
        <Paragraph>
            Pythonに限らず、プログラミング言語が扱うデータには"型(<span class="text-yellow-400">type</span>)"が存在する。
            基本的になものに、<span class="text-yellow-400">int</span>型, <span class="text-yellow-400">float</span>型, <span class="text-yellow-400">str</span>型, そして<span class="text-yellow-400">bool</span>型がある。

            <SubHeader>int型</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">int</span>型は整数(<span class="text-yellow-400">integer</span>)を表す。
                例えば、3, 5, -4, 0などである。
                整数型は、互いに演算が可能である。つまり、int型については、5 + 9 = 14のような計算ができる。
                また、結果を出力したい場合には、<span class="text-yellow-400">print()</span>関数を使うことも覚えておこう。

                <PyScript>
                    print(5 + 9)
                </PyScript>
            </Paragraph>

            <SubHeader>float型</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">float</span>型は浮動小数点数(<span class="text-yellow-400">floating-point number</span>)を表す。
                例えば、0.12, 10.0, -59.43などである。浮動小数点数の詳細について本講では扱わないが、実用上は"フツーの小数"として扱って構わない。
                もちろん、int型同様に演算が可能である。また、int型と組み合わせて計算できる。

                <PyScript>
                    print(6.5 + 3.5 - 10)
                </PyScript>
            </Paragraph>

            <SubHeader>str型</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">str</span>型は文字列(<span class="text-yellow-400">string</span>)を表す。
                例えば、"Hello World"や"こんにちは"などである。
                ''(single quotation)、または""(double quotation)で囲まれたデータは全てstr型となるため、"5", "10.7"といったデータもstr型である。
                また、str型では、"5" + "10.7" = "15.7"のように計算することはできない。

                <PyScript>
                    print("Hello World!")
                </PyScript>
                <PyScript>
                    print("5" + "10.7")
                </PyScript>
            </Paragraph>

            <SubHeader>bool型</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">bool</span>型は真偽値(<span class="text-yellow-400">boolean</span>)を表す。
                これに該当するのは、<span class="text-yellow-400">True</span>(真)と<span class="text-yellow-400">False</span>(偽)の2値だけである(1 bit)。
                bool型はint型のサブタイプであって、その実はTrue=1, False=0に対応している。
                したがって、True + True = 2のような演算も可能であるが、この実用性は皆無である。

                <PyScript>
                    print(True)
                </PyScript>
            </Paragraph>

            <Paragraph class="mt-6">
                str, int間の型変換(<span class="text-yellow-400">casting</span>)は特に頻繁に行われる。
                strに変換したい場合には<span class="text-yellow-400">str()</span>関数を、
                intに変換したい場合には<span class="text-yellow-400">int()</span>関数を用いる。
                ただし、変換不能の値を渡した場合はエラーとなる。

                <PyScript>
                    type(str(5))
                </PyScript>
                <PyScript>
                    type(int("5"))
                </PyScript>
                <PyScript>
                    type(int("Hello World"))
                </PyScript>
            </Paragraph>
        </Paragraph>


        <Header>2.変数</Header>
        <Paragraph>
            Pythonを含むほぼ全ての高水準言語には、"変数(<span class="text-yellow-400">variable</span>)"が存在する。
            変数とは、「扱うデータを読み書きする記憶域 (storage) のこと」
            (<a href="https://ja.wikipedia.org/wiki/%E5%A4%89%E6%95%B0_(%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0)#:~:text=%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E5%A4%89%E6%95%B0%EF%BC%88%E3%81%B8%E3%82%93%E3%81%99%E3%81%86,%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%93%E3%81%A8%E3%81%8C%E3%81%A7%E3%81%8D%E3%82%8B%E3%80%82" class="underline text-blue-200">Wikipedia「変数(プログラミング)」</a>より引用)だが、その機能は、数学で用いられる"文字"(a, b, α, β, x, yなど)とよく似ている。
        </Paragraph>

        <Paragraph>
            といっても、どのようなものか分からないと思うので、以下にその例を示す。
        </Paragraph>
        <PyScript>
            data1 = 100             # 変数"data1"に整数100を代入
            data2 = 50              # 変数"data2"に整数50を代入
            print(data1 + data2)    # 2変数の和を出力
        </PyScript>
        <Paragraph>
            変数の名前(上の例であれば、"data1"や"data2")は、一部の例外を除き、
            好きな文字、数字およびアンダーバー(_)を使って定義して良い。
            上のプログラムを書き換えて、好きな変数名を使って試してみよう。
        </Paragraph>

        <Paragraph>
            次の例を見て、さらに理解を深めよう。
        </Paragraph>
        <PyScript>
            a = 1       # 変数"a"に整数1を代入
            b = 2       # 変数"b"に整数2を代入
            a = a + b   # 変数"a"に a + b の結果を代入
            print(a)    # 変数"a"の値を出力
        </PyScript>
        <Paragraph>
            ここで、3行目の"a = a + b"という表現に違和感を覚える方がいるかもしれない。
            これは、プログラミングにおける"="という記号が、
            等しいという意味ではなく、代入する(<span class="text-yellow-400">assign</span>)という操作を意味するからである。
            したがって、"a = a + b"は、"aの値をa + bの値に書き換えなさい"という命令に他ならない。
        </Paragraph>


        <Header>3.演算子</Header>
        <Paragraph>
            Pythonの演算子(<span class="text-yellow-400">operator</span>)には、その機能に応じて、算術演算子、代入演算子、比較演算子などがある。
            ここでは、この3種類の演算子を見ていこう。

            <SubHeader>算術演算子</SubHeader>
            <Paragraph>
                算術演算子とは、数の計算に用いられる演算子のことで、<span class="text-yellow-400">+</span>, <span class="text-yellow-400">-</span>, <span class="text-yellow-400">*</span>, <span class="text-yellow-400">/</span> のほか、
                <span class="text-yellow-400">**</span>(べき乗), <span class="text-yellow-400">%</span>(mod計算), <span class="text-yellow-400">//</span>(切り捨て除算)などがあり、全てa ○ bという形式で用いられる。
                
                <PyScript>
                    print(2 ** 3)
                </PyScript>
                <PyScript>
                    print(10 // 3)
                </PyScript>
                <PyScript>
                    print(10 % 3)
                </PyScript>
            </Paragraph>

            <SubHeader>代入演算子</SubHeader>
            <Paragraph>
                代入演算子とは、変数への代入の際に用いられる演算子のことで、=はもちろん、
                =に算術演算子を加えた複合代入演算子(<span class="text-yellow-400">+=</span>, <span class="text-yellow-400">-=</span>など)もある。<br>
                複合代入演算子の定義は、a ○= b => a = a ○ bである。

                <PyScript>
                    a = 3
                    a += 1
                    print(a)
                </PyScript>
                <PyScript>
                    a = 3
                    a -= 1
                    print(a)
                </PyScript>
            </Paragraph>

            <SubHeader>比較演算子</SubHeader>
            <Paragraph>
                比較演算子は、表現を評価(<span class="text-yellow-400">evaluate</span>)して真偽値を得るための演算子である。
                例えば、<span class="text-yellow-400">==</span>や<span class="text-yellow-400">&lt;</span>, <span class="text-yellow-400">&gt;</span>、あるいは<span class="text-yellow-400">&lt;=</span>, <span class="text-yellow-400">&gt;=</span>が頻繁に使われる。

                <Paragraph>
                    次のプログラムの変数の値を書き換えて、出力をTrueにしてみよう。
                </Paragraph>
                <PyScript>
                    a = 3
                    b = 4
                    print(a == b)
                </PyScript>
                <PyScript>
                    a = 3
                    b = 4
                    print(a &gt; b)
                </PyScript>
                <PyScript>
                    a = 3
                    b = 4
                    print(a &gt;= b)
                </PyScript>
            </Paragraph>

            <Paragraph class="mt-5">
                おまけ: 文字列演算子(<span class="text-yellow-400">+</span>)というものもある。
                これはstr型のデータを連結(<span class="text-yellow-400">concatenate</span>)するときに用いられ、使い方は算術演算子の+と変わらない。

                <PyScript>
                    a = "Hello "
                    b = "World!"
                    print(a + b)
                </PyScript>
            </Paragraph>
        </Paragraph>


        <Header>4.練習問題</header>
        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-green-600 font-bold">Easy</span>] 入力される名前を、"Your name is XXX."のように出力するプログラムを書け。</SubHeader>
            <Hint unique_id="easy"><span class="text-yellow-400">input()</span>関数を使うと、入力された文字列を取得できる。</Hint>

            <PyScript>
                name = input()
                # 続きを書いてね
            </PyScript>
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-yellow-400 font-bold">Medium</span>] 入力される2数(num1, num2)の平均を求めるプログラムを書け。</SubHeader>
            <Hint unique_id="med1">input()関数から返されるデータは、<span class="text-yellow-400">str</span>型であることに注意しよう。</Hint>

            <PyScript>
                num1 = input()
                num2 = input()
                # 続きを書いてね
            </PyScript>
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-yellow-400 font-bold">Medium</span>] 次のプログラムの誤りを指摘し、修正せよ。</SubHeader>
            <Hint unique_id="med2">プログラムは、括弧の内側から順に評価される。</Hint>

            <PyScript>
                a = input()         # aに任意の数を代入
                b = input()         # bに任意の数を代入
                print(float(a + b)) # aとbの和を出力  
            </PyScript>
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-red-500 font-bold">Hard</span>] 1番目の整数(num1)から2番目の整数(num2)を引いた結果を出力するプログラムを書け。ただし、算術演算子のうち使えるのは + のみとする。</SubHeader>
            <Hint unique_id="hard"><span class="text-yellow-400">ビット演算</span>について調べてみよう。</Hint>

            <PyScript>
                num1: int = 10
                num2: int = 8
                # 続きを書いてね
            </PyScript>
        </Paragraph>

        <ProgressFooter :progress="completion" class="mt-16" />
        <div class="text-center my-5">
            <a href="#" class="p-2 rounded-md bg-green-700 hover:bg-green-600">ページ上部へ!</a>
        </div>
    </div>
</template>

<style scoped>
</style>