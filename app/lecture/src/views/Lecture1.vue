<script setup>
    import { RouterLink } from 'vue-router';
    import Title from '../components/Title.vue';
    import Header from '../components/Header.vue';
    import SubHeader from '../components/SubHeader.vue';
    import Paragraph from '../components/Paragraph.vue';
    import PyScript from '../components/PyScript.vue';

</script>

<template>
    <Title>第1講 Python: データ型、変数、演算子</Title>

    <div class="container w-3/6 mx-auto text-start">
        <Header>1.データ型</Header>
        <Paragraph>
            Pythonに限らず、プログラミング言語が扱うデータには"型(type)"が存在する。
            基本的になものに、<span class="text-yellow-400">int</span>, <span class="text-yellow-400">float</span>, <span class="text-yellow-400">str</span>, そして<span class="text-yellow-400">bool</span>型がある。

            <SubHeader>int型</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">int</span>型は整数(integer)を表す。
                例えば、3, 5, -4, 0などである。
                整数型は、互いに演算が可能である。つまり、int型については、5 + 9 = 14のような計算ができる。
                また、結果を出力したい場合には、<span class="text-yellow-400">print()</span>関数を使うことも覚えておこう。

                <PyScript>
                    print(5 + 9)
                </PyScript>
            </Paragraph>

            <SubHeader>float型</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">float</span>型は浮動小数点数(floating-point number)を表す。
                例えば、0.12, 10.0, -59.43などである。浮動小数点数の詳細について本講では扱わないが、実用上は"フツーの小数"として扱って構わない。
                もちろん、int型同様に演算が可能である。また、int型と組み合わせて計算できる。

                <PyScript>
                    print(6.5 + 3.5 - 10)
                </PyScript>
            </Paragraph>

            <SubHeader>str型</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">str</span>型は文字列(string)を表す。
                例えば、"Hello World"や"こんにちは"などである。
                ''(single quotation)、または""(double quotation)で囲われたデータは全て文字列型となるため、"5", "10.7"といったデータも型である。
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


        <Header>2.変数</Header>
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


        <Header>3.演算子</Header>
        <Paragraph>
            Pythonの演算子には、その機能に応じて、算術演算子、代入演算子、比較演算子などがある。
            ここでは、この3種類の演算子を見ていこう。
        </Paragraph>

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


        <h2 class="pt-5">3.演算子</h2>
        <p class="h5 pt-3">
            
        </p>
        <p class="h5 pt-3">
            
        </p>
        <div class="container bg-dark border border-success rounded m-3 px-3 py-3">
            <p class="h6">Python3.11</p>
            <div class="bg-white text-black">
                <py-repl></py-repl>
                <py-repl>print(10 % 3)</py-repl>
                <py-repl>print(10 // 3)</py-repl>
            </div>
        </div>
        <p class="h5 pt-3">
            
        </p>
        <div class="container bg-dark border border-success rounded m-3 px-3 py-3">
            <p class="h6">Python3.11</p>
            <div class="bg-white text-black">
                <py-repl>
                    print(a)
                </py-repl>
                <py-repl>
                    a = 3
                    a += 1
                    print(a)
                </py-repl>
            </div>
        </div>
        <p class="h5 pt-3">
            比較演算子は、表現を評価(evaluate)して真偽値を得るための演算子である。
            例えば、<span class="text-yellow-400">==</span>や<span class="text-yellow-400">&lt;</span>、あるいは<span class="text-yellow-400">&gt;=</span>が頻繁に使われる。
        </p>
        <div class="container bg-dark border border-success rounded m-3 px-3 py-3">
            <p class="h6">Python3.11</p>
            <div class="bg-white text-black">
                <py-repl>
                    a = 3
                    b = 4
                    print(a == b)
                </py-repl>
                <py-repl>
                    a = 3
                    b = 4
                    print(a &gt; b)
                </py-repl>
                <py-repl>
                    a = 3
                    b = 4
                    print(a &gt;= b)
                </py-repl>
            </div>
        </div>
        <p class="h5 pt-3">
            おまけ: 文字列演算子(<span class="text-yellow-400">+</span>)というものもある。
            これはstr型のデータを連結するときに用いられ、使い方は算術演算子の+と変わらない。
        </p>
        <div class="container bg-dark border border-success rounded m-3 px-3 py-3">
            <p class="h6">Python3.11</p>
            <div class="bg-white text-black">
                <py-repl>
                    a = "Hello "
                    b = "World!"
                    print(a + b)
                </py-repl>
            </div>
        </div>

        <h2 class="pt-5">4.練習問題</h2>
        <div class="py-3">
            <h4>[<span class="text-success">Easy</span>] 名前を尋ね、それを出力するプログラムを書け。</h4>
            <div class="row">
                <a class="h6 btn btn-primary hint-btn" role="button" target="#hint-easy">ヒントを見る</a>
                <div id="hint-easy" class="hint">
                    <p>Hint: <span class="text-yellow-400">input()</span>関数を使うと、入力された文字列を取得できる。</p>
                </div>
            </div>
            <div class="container bg-dark border border-success rounded m-3 px-3 py-3">
                <p class="h6">Python3.11</p>
                <div class="bg-white text-black">
                    <py-repl>
                        name = input("What is your name? &gt; ")
                        # 続きを書いてね
                    </py-repl>
                </div>
            </div>
        </div>
        <div class="py-3">
            <h4>[<span class="text-yellow-400">Medium</span>] 入力された2数の平均を求めるプログラムを書け。ただし、出力は小数部を切り捨てた整数であること。</h4>
            <div class="row">
                <a class="h6 btn btn-primary hint-btn" role="button" target="#hint-med">ヒントを見る</a>
                <div id="hint-med" class="hint">
                    <p>Hint: <span class="text-yellow-400">int()</span>関数を使うと、小数部は切り捨てられる。</p>
                </div>
            </div>
            <div class="container bg-dark border border-success rounded m-3 px-3 py-3">
                <p class="h6">Python3.11</p>
                <div class="bg-white text-black">
                    <py-repl>
                        num1 = input("First number &gt; ")
                        num2 = input("Second number &gt; ")
                        # 続きを書いてね
                    </py-repl>
                </div>
            </div>
        </div>
        <div class="py-3">
            <h4>[<span class="text-danger">Hard</span>] 1番目に入力された整数から2番目に入力された整数を引き、その差を1/2倍した数を出力するプログラムを書け。ただし、算術演算子のうち使えるのは + のみとし、出力は小数点以下を切り捨てても良いものとする。</h4>
            <div class="row">
                <a class="h6 btn btn-primary hint-btn" role="button" target="#hint-hard">ヒントを見る</a>
                <div id="hint-hard" class="hint">
                    <p>Hint: <span class="text-yellow-400">ビット演算子</span>について調べてみよう。</p>
                </div>
            </div>
            <div class="container bg-dark border border-success rounded m-3 px-3 py-3">
                <p class="h6">Python3.11</p>
                <div class="bg-white text-black">
                    <py-repl>
                        num1 = input("First number &gt; ")
                        num2 = input("Second number &gt; ")
                        # 続きを書いてね
                    </py-repl>
                </div>
            </div>
        </div>
    </div>
    <a href="#" class="p-2 rounded-md bg-green-700 hover:bg-green-600">ページ上部へ!</a>
</template>

<style scoped>
</style>