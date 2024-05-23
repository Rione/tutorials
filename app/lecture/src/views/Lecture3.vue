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
    <Title>第3講 Python: 配列・辞書</Title>

    <div class="container w-3/6 mx-auto mb-10 text-start">
        <Header>1.配列</Header>
        <Paragraph>
            配列(<span class="text-yellow-400">list</span>, <span class="text-yellow-400">array</span>)とは、「複数の要素（値）の集合を格納・管理するのに用いられるデータ構造」(<a href="https://ja.wikipedia.org/wiki/%E9%85%8D%E5%88%97" class="underline text-blue-200">Wikipedia「配列」</a>より引用)のことである。
            より簡便に、いろいろなデータが入った容器だと捉えても構わない。

            <SubHeader>配列の基本</SubHeader>
            <Paragraph>
                まずは、実際の例を見て配列を理解しよう。

                <PyScript>
                    food = ['Apple', 'Banana', 'Cherry', 'Durian', 'Eggplant']

                    print(food[0])
                </PyScript>

                上の例では、1行目でstr型のデータを格納したlistを定義している。
                listに格納されたデータは、food[0]のように、listの変数名の後ろにインデックス(<span class="text-yellow-400">index</span>)を指定することでアクセスできる。
                ここで、indexが0オリジン(<span class="text-yellow-400">zero-based</span>)であることには十分注意してほしい。
            </Paragraph>

            <Paragraph>
                次に、配列の要素を書き換えてみよう。

                <PyScript>
                    food = ['Apple', 'Banana', 'Cherry', 'Durian', 'Eggplant']

                    food[0] = 'Avocado'
                    print(food)
                </PyScript>

                上の例では、foodの0番目の要素を'Avocado'に書き換えている。
                この場合も、listの変数名の後にindexを書けば良い。
            </Paragraph>

            <Paragraph>
                おまけ: Pythonにおけるlistは、一般的なCやJavaの配列とは異なり、動的配列(<span class="text-yellow-400">dynamic array</span>)である。これは、list内のデータが増減するたびに、自動的にメモリ領域が再割り当てされるということである。事前に定まったメモリ領域を確保し、管理するという手間は生じない。<br>
                これは、C++におけるstd::vectorやJavaにおけるjava.util.ArrayListなどのライブラリが実装するものと同様の機能である。
            </Paragraph>

            <SubHeader>配列とfor文</SubHeader>
            <Paragraph>
                配列の全ての要素を順に取り出したい場合には、for文を用いる。
                listはイテラブルオブジェクト(<span class="text-yellow-400">iterable object</span>)であるため、単にfor文のin句の直後に渡せば良い。  

                <PyScript>
                    food = ['Apple', 'Banana', 'Cherry', 'Durian', 'Eggplant']

                    for i in food:
                        print(i)
                </PyScript>

                また、配列の全ての要素に対して変更を加えたい場合にもfor文を用いる。
                ただし、上記の方法ではうまくいかない。
                なぜなら、indexのiには配列の各要素のコピー(<span class="text-yellow-400">deep copy</span>)が渡されているため、参照元のデータを書き換えることができないからである。これについては、次項で詳説する。
            </Paragraph>

            <Paragraph>
                従って、配列の全ての要素を書き換えるためには次のようにすること。

                <PyScript>
                    food = ['Apple', 'Banana', 'Cherry', 'Durian', 'Eggplant']

                    for i in range(len(food)):
                        food[i] = 'Meat'
                    
                    print(food)
                </PyScript>

                <span class="text-yellow-400">len()</span>関数は、与えられたlistの要素の個数を返す。
                つまり上の例では、foodの要素の個数は5個のため、len(food)はint型の5を返す。
                これをrange()関数に渡すことで、listのindexに対応した数列が得られる。
            </Paragraph>

            <SubHeader>配列のコピー</SubHeader>
            <Paragraph>
                データのコピーには、<span class="text-yellow-400">deep copy</span>と<span class="text-yellow-400">shallow copy</span>の2種類が存在する。
                一般の変数のコピーはdeep copyであるが、配列の場合にはshallow copyとなるため、注意を要する。
                まずは、例をそれぞれ見てみよう。

                <PyScript>
                    a = 2
                    b = a       # deep copy
                    
                    print(f'Before: a = {a}')
                    print(f'Before: b = {b}')

                    a = 3       # コピーの参照元を書き換え

                    print(f'After: a = {a}')
                    print(f'After: b = {b}')
                </PyScript>

                上のコードでは、一般の変数のコピー、すなわちdeep copyの例を示した。
                deep copyは、コピー元のオブジェクト(変数)のみならず、メモリ上にある参照先の実体(インスタンス)ごとコピーを行うため、一方を書き換えても、他方のインスタンスが書き換わることはない。
            </Paragraph>

            <Paragraph>
                では次に、shallow copyの例を見てみよう。

                <PyScript>
                    sequence1 = [1, 1, 2, 3, 5, 8, 13]
                    sequence2 = sequence1           # shallow copy

                    print(f'Before: seq1 = {sequence1}')
                    print(f'Before: seq2 = {sequence2}')

                    sequence1[0] = 0                # コピーの参照元を書き換え

                    print(f'After: seq1 = {sequence1}')
                    print(f'After: seq2 = {sequence2}')
                </PyScript>

                上の例は、コピーの参照元を書き換えると、コピーした配列の値も書き変わることを示している。
                shallow copyでは、コピーされるのはコピー元のオブジェクト(変数)のみであり、実体となるメモリ上のデータは共有される。
                つまり、同じデータに対して異なる変数名を使ってアクセスしていることに相違ない。
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
                配列(list)については次回に詳説するので、今は、"複数のデータが入った入れ物"という認識で構わない。
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
            <SubHeader class="mb-3">[<span class="text-green-600 font-bold">Easy</span>] 1以上x未満の範囲に含まれる奇数の総和を求めるプログラムを書け。</SubHeader>
            <Hint level="easy1"><span class="text-yellow-400">range()</span>関数を使うと、list型(厳密にはrange型)の数列を取得できる。</Hint>

            <PyScript>
                x: int = 100
                # 続きを書いてね
            </PyScript>
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-green-600 font-bold">Easy</span>] 次のプログラムのエラーの原因を特定し、修正せよ。</SubHeader>
            <Hint level="easy2">宣言されていない変数は呼び出せない。</Hint>

            <PyScript>
                sum = 0
                while (flag):
                    sum += 1
                    if (sum > 5):
                        flag = False
                print('Correct!')
            </PyScript>
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-yellow-400 font-bold">Medium</span>] 入力された自然数に対して、適切な序数を出力するプログラムを書け。例えば、1が入力された時に"1st"を返すこと。</SubHeader>
            <Hint level="med">1の位の数に応じて条件分岐させること。ただし、例外がいくつか存在するので注意せよ。</Hint>

            <PyScript>
                num = input()
                # 続きを書いてね
            </PyScript>
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-red-500 font-bold">Hard</span>] 任意の実数x(rad)に対して、sin(x)の値を出力するプログラムを書け。ただし、必要な計算精度は10桁程度とし、以下のpiの値を利用しても良いものとする。</SubHeader>
            <Hint level="hard">愚直にテイラー展開しても良いが、周期性を利用することで効率的なコードが書ける。</Hint>

            <PyScript>
                pi: float = 3.14159265359
                x: float = pi / 2 
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