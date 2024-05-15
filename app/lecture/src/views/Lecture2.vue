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
    <Title>第2講 Python: if文、for文、while文</Title>

    <div class="container w-3/6 mx-auto mb-10 text-start">
        <Header>1.if文</Header>
        <Paragraph>
            <span class="text-yellow-400">if</span>文とは、与えられた条件に応じて処理の方法や順番を変えるための構文であり、Pythonのみならず、多くのプログラミング言語で実装されている。
            Pythonにおけるif文は、分岐後の処理をインデント(<span class="text-yellow-400">indent</span>)、つまり字下げして記述するという特徴がある。

            <Paragraph>
                それでは、以下の例を見てif文の挙動を確認しよう。

                <PyScript>
                    a = 2       # aに整数を代入
                    b = 2       # bに整数を代入
                    if (a == b):    # 条件式の後ろの:(コロン)を忘れないように
                        print("a is equal to b")
                    print("finish")
                </PyScript>

                上の例では、if句の括弧の中に評価したい式(a == b)が記述されている。
                そして、それがTrueの場合のみ"a is equal to b"という文字列が出力されるはずだ。
                また、if文の効果はインデントされた処理のみに限定されるため、その後の"finish"という文字列は条件式の真偽に関わらず表示されることにも気付いただろう。
            </Paragraph>

            <Paragraph>
                if句にはサブタイプがあり、<span class="text-yellow-400">elif</span>句と<span class="text-yellow-400">else</span>句が存在する。
                これらはifと共に用い、単独で用いることはできない。ちなみに、elifはelse ifの略記である。
                これも、例を見て挙動を確認しよう。

                <PyScript>
                    a = 2
                    b = 3
                    if (a == b):
                        print("a is equal to b")
                    else:
                        print("a is NOT equal to b")
                </PyScript>

                上の例では、条件式がFalseの時に、else句内の処理が排他的に実行される。
                言い換えれば、if句内の処理とelse句内の処理が同時に実行されることはない。
            </Paragraph>

            <Paragraph>
                それでは、elif句を使った例も見てみよう。

                <PyScript>
                    print("Hello World!")
                </PyScript>
            </Paragraph>

            <SubHeader>bool型</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">bool</span>型は真偽値(boolean)を表す。
                これに該当するのは、True(真)とFalse(偽)の2値だけである(1 bit)。
                bool型はint型のサブタイプであって、その実はTrue=1, False=0に対応している。
                したがって、True + True = 2のような演算も可能であるが、実用性は皆無である。

                <PyScript>
                    print(True)
                </PyScript>
            </Paragraph>

            <Paragraph class="mt-6">
                str, int間の型変換(typecasting)は頻繁に行われる。
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


        <Header>2.for文</Header>
        <Paragraph>
            Pythonを含むほぼ全ての高水準言語には、"変数(variable)"が存在する。
            変数とは、「扱うデータを読み書きする記憶域 (storage) のこと」
            (<a href="https://ja.wikipedia.org/wiki/%E5%A4%89%E6%95%B0_(%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0)#:~:text=%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E5%A4%89%E6%95%B0%EF%BC%88%E3%81%B8%E3%82%93%E3%81%99%E3%81%86,%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%81%93%E3%81%A8%E3%81%8C%E3%81%A7%E3%81%8D%E3%82%8B%E3%80%82" class="underline text-blue-200">Wikipedia「変数(プログラミング)」</a>より引用)だが、
            その機能は、数学で用いられる"文字"(a, b, α, β, x, yなど)とよく似ている。
        </Paragraph>

        <Paragraph>
            といっても、どのようなものか分からないと思うので、以下にその例を示す。
        </Paragraph>
        <PyScript>
            data1 = 100     # 変数"data1"に整数100を代入
            data2 = 50      # 変数"data2"に整数50を代入
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
            等しいという意味ではなく、代入する(assign)という操作を意味するからである。
            したがって、"a = a + b"は、"aの値をa + bの値に書き換えなさい"という命令に他ならない。
        </Paragraph>


        <Header>3.while文</Header>
        <Paragraph>
            Pythonの演算子には、その機能に応じて、算術演算子、代入演算子、比較演算子などがある。
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
                =に算術演算子を加えた複合代入演算子(<span class="text-yellow-400">+=</span>, <span class="text-yellow-400">-=</span>など)もある。
                複合代入演算子の定義は、a ○= b := a = a ○ bである。

                <PyScript>
                    a = 3
                    print(a)
                </PyScript>
                <PyScript>
                    a = 3
                    a += 1
                    print(a)
                </PyScript>
            </Paragraph>

            <SubHeader>比較演算子</SubHeader>
            <Paragraph>
                比較演算子は、表現を評価(evaluate)して真偽値を得るための演算子である。
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
                    print(a &lt;= b)
                </PyScript>
            </Paragraph>

            <Paragraph class="mt-5">
                おまけ: 文字列演算子(<span class="text-yellow-400">+</span>)というものもある。
                これはstr型のデータを連結するときに用いられ、使い方は算術演算子の+と変わらない。

                <PyScript>
                    a = "Hello "
                    b = "World!"
                    print(a + b)
                </PyScript>
            </Paragraph>
        </Paragraph>


        <Header>4.練習問題</header>
        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-green-600 font-bold">Easy</span>] 名前を尋ね、それを出力するプログラムを書け。</SubHeader>
            <Hint level="easy"><span class="text-yellow-400">input()</span>関数を使うと、入力された文字列を取得できる。</Hint>

            <PyScript>
                name = input("What is your name? &gt; ")
                # 続きを書いてね
            </PyScript>
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-yellow-400 font-bold">Medium</span>] 入力された2数の平均を求めるプログラムを書け。</SubHeader>
            <Hint level="med1">input()関数から返されるデータは、<span class="text-yellow-400">str</span>型であることに注意しよう。</Hint>

            <PyScript>
                num1 = input("First number &gt; ")
                num2 = input("Second number &gt; ")
                # 続きを書いてね
            </PyScript>
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-yellow-400 font-bold">Medium</span>] 次のプログラムのエラーの原因を特定し、修正せよ。</SubHeader>
            <Hint level="med2">int型 + str型 = ?</Hint>

            <PyScript>
                a = 10              # aに10を代入
                b = "5.5"           # bに"5.5"を代入
                print(float(a + b)) # str型をfloat型にキャストして足す  
            </PyScript>
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-red-500 font-bold">Hard</span>] 1番目に入力された整数から2番目に入力された整数を引いた結果を出力するプログラムを書け。ただし、算術演算子のうち使えるのは + のみとする。</SubHeader>
            <Hint level="hard"><span class="text-yellow-400">ビット演算</span>について調べてみよう。</Hint>

            <PyScript>
                num1 = input("First number &gt; ")
                num2 = input("Second number &gt; ")
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