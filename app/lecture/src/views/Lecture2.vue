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

            <SubHeader>if文の基本</SubHeader>
            <Paragraph>
                それでは、以下の例を見てif文の挙動を確認しよう。

                <PyScript>
                    a = 2       # aに整数を代入
                    b = 2       # bに整数を代入
                    if (a == b):                    # 条件式の後ろの:(コロン)を忘れないように
                        print("a is equal to b")    # 分岐処理はインデント(Tabキー押下)すること
                    print("finish")
                </PyScript>

                上の例では、if句の括弧の中に評価したい式(a == b)が記述されている。
                そして、それがTrueの場合のみ"a is equal to b"という文字列が出力されるはずだ。
                また、if文の効果はインデントされた処理のみに限定されるため、その後の"finish"という文字列は条件式の真偽に関わらず表示されることにも気付いただろう。
            </Paragraph>

            <SubHeader>elif句とelse句</SubHeader>
            <Paragraph>
                if句にはサブタイプがあり、<span class="text-yellow-400">elif</span>句と<span class="text-yellow-400">else</span>句が存在する。
                これらはif句と共に用い、単独で用いることはできない。これも、例を見て挙動を確認しよう。

                <PyScript>
                    a = 2
                    b = 3
                    if (a == b):
                        print("a is equal to b")
                    else:
                        print("a is NOT equal to b")
                </PyScript>

                上の例では、条件式がFalseの時に、else句内の処理が排他的に実行される。
                つまり、if句内の処理とelse句内の処理が同時に実行されることはない。
            </Paragraph>

            <Paragraph>
                それでは、elif句を併せて使った例も見てみよう。ちなみに、elifはelse ifの略記である。

                <PyScript>
                    a = 2
                    b = 3
                    if (a == b):
                        print("a is equal to b")
                    elif (a < b):
                        print("a is smaller than b")
                    else:
                        print("a is greater than b")
                </PyScript>

                このようにelif句は、上の条件式(a == b)がFalseとなった場合に、さらに異なる条件式(a < b)を評価することができる。
                else句の処理の中にif文をネストして記述するのと同様の挙動を得られるため、可読性の観点から、elif句を使用することが推奨される。以下に、同様の挙動を示すネストされた例を載せておくが、どちらが読みやすいかは一目瞭然だろう。

                <PyScript>
                    a = 2
                    b = 3
                    if (a == b):
                        print("a is equal to b")
                    else:
                        if (a < b):
                            print("a is smaller than b")
                        else:
                            print("a is greater than b")
                </PyScript>
            </Paragraph>
        </Paragraph>


        <Header>2.for文</Header>
        <Paragraph>
            <span class="text-yellow-400">for</span>文は、反復処理(<span class="text-yellow-400">iteration</span>)を実現したい時に用いる構文である。
            for文は、Python以外のプログラミング言語でも広く実装されており、その使い方も類似している。

            <SubHeader>for文の基本</SubHeader>
            <Paragraph>
                まずは、以下の例を見てfor文の概観を掴むとしよう。

                <PyScript>
                    fruits = ["Apple", "Banana", "Cherry"]

                    for fruit in fruits:    # コロンを付すこと
                        print(fruit)        # インデント
                </PyScript>

                コロンやインデントなど、その記法はif文に見られるものと同様である。
                また、for文は原則として反復する対象となるイテラブル(<span class="text-yellow-400">iterable</span>)が必要であるため、ここでは、複数の文字列を含むlist型の変数fruitsを定義して渡している。
                イテラブルの各要素は、インデックス(<span class="text-yellow-400">index</span>)のfruitに順に代入されていく。
                配列(list)については次項で詳説するので、今は、"複数のデータが入った入れ物"という認識で構わない。
            </Paragraph>

            <SubHeader>指定回数だけ反復させる</SubHeader>
            <Paragraph>
                これを応用して、指定回数だけ処理を実行するコードを以下に示す。
                例では、5回反復させている。

                <PyScript>
                    for i in range(5):
                        print(i)
                </PyScript>

                <span class="text-yellow-400">range()</span>関数は、引数にint型を取る。任意の自然数をnとすれば、range(n)は区間[0, n)に含まれる全ての整数をlist(厳密には、range型)として返す。以下を実行して、確認してみると良い。

                <PyScript>
                    list(range(5))
                </PyScript>

                したがって、range()関数の引数に渡した整数回だけ、反復処理を実行することができる。
            </Paragraph>

            <SubHeader>continue句とbreak句</SubHeader>
            <Paragraph>
                for文とif文を組み合わせることで、より複雑な処理を実行することができる。
                以下は、イテレーションが偶数のインデックスを持つ時のみ、インデックスを出力するプログラムである。

                <PyScript>
                    for i in range(10+1):
                        if (i % 2 == 1):    # インデックスが奇数の時
                            continue        # 次のイテレーションへスキップする
                        else:
                            print(i)
                </PyScript>

                上の例では、i % 2 == 1 即ち iが奇数の時 には<span class="text-yellow-400">continue</span>句が実行される。
                continue句は次のイテレーションへとスキップしたい時に用いられるが、上のような単純なプログラムであればcontinue句を必ずしも必要としないこともある。
            </Paragraph>

            <Paragraph>
                <span class="text-yellow-400">break</span>句は、イテレーションから抜け出したい時に用いる。
                以下の例は、1から順に自然数を足していき、その合計が100以上になった時点でイテレーションから脱出するプログラムである。

                <PyScript>
                    sum = 0                     # 合計値を初期化
                    for i in range(1, 50+1):    # 1から50までの数列を生成
                        sum += i                # 合計値にインデックスの値を足す
                        if (sum >= 100):        # 合計が100以上の時
                            print(i)            # 100以上となった時のインデックスを出力
                            break               # イテレーションを脱出する
                </PyScript>

                上の例では反復する範囲が予め決められているが、このような、いつ条件が満たされるか分からないような反復処理に対しては、後述するwhile文を用いる方が良い。
                また、各イテレーション間で値が共有されるべき変数(sum)は、for文より先に宣言・初期化される必要があることも覚えておこう。
            </Paragraph>
        </Paragraph>


        <Header>3.while文</Header>
        <Paragraph>
            <span class="text-yellow-400">while</span>文も、反復処理のための構文であることには違いないが、反復の方法がfor文とは異なっている。具体的には、条件式がTrueである間、処理を繰り返し続ける。
            
            <SubHeader>while文の基本</SubHeader>
            <Paragraph>
                まずは以下の例を見てみよう。

                <PyScript>
                    a = 0
                    while (a < 100):
                        a += 1
                    print("finish")
                </PyScript>

                記法自体は、if文のそれと違わない。
                上の例では、a < 100という条件式がTrueの間、即ち aが100未満 である間はa += 1が繰り返され続ける。
                条件式がFalseになるとwhile文から離脱し、次の処理へと移行する。
                また、while文においても、for文と同様にcontinue句やbreak句を使うことができる。
            </Paragraph>

            <SubHeader>while文の実際</SubHeader>
            <Paragraph>
                while文は、ある特定の条件式をもとに反復処理を実行することができるが、実用上は、break句と併せて<span class="text-yellow-400">無限ループ</span>として用いられることも多い。例えば、以下のような場合である。

                <PyScript>
                    cube = 125
                    cube_root = 1
                    while True:
                        if (cube_root ** 3 == cube):
                            print(f"the cube root of {cube} is {cube_root}.")
                            break
                        elif (cube_root > cube / 2):
                            print(f"the cube root of {cube} is not an integer.")
                            break
                        cube_root += 1
                </PyScript>

                上の例は、与えられた立方数(cube)に対して、総当たりでその3乗根(cube_root)を求めるプログラムである。
                ここでは、while句の条件式にTrueを指定することで無限ループを実装し、if文とbreak句の組み合わせによって反復を制御している。
                このように、より複雑な反復の制御が必要になった場合には、while句の条件式を仮にTrue(または1)としておき、実際の制御をif文で行うこともできる。
            </Paragraph>
        </Paragraph>


        <Header>4.練習問題</header>
        <Paragraph>
            鋭意、制作中です! しばしお待ちを。
        </Paragraph>
        <!-- <Paragraph>
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
        </Paragraph> -->

        <ProgressFooter :progress="completion" class="mt-16" />
        <div class="text-center my-5">
            <a href="#" class="p-2 rounded-md bg-green-700 hover:bg-green-600">ページ上部へ!</a>
        </div>
    </div>
</template>

<style scoped>
</style>