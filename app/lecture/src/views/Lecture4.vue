<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import Title from '../components/Title.vue';
    import Header from '../components/Header.vue';
    import SubHeader from '../components/SubHeader.vue';
    import Paragraph from '../components/Paragraph.vue';
    import PyScript from '../components/PyScript.vue';
    import Code from '../components/Code.vue';
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
    <Title>第4講 Python: 関数、ライブラリ</Title>

    <div class="container w-3/6 mx-auto mb-10 text-start">
        <Header>1.関数</Header>
        <Paragraph>
            関数(<span class="text-yellow-400">function</span>, クラス内で宣言されるものは<span class="text-yellow-400">method</span>)は、与えられた引数(<span class="text-yellow-400">argument</span>)に対して何らかの処理を実行し、戻り値(<span class="text-yellow-400">return value</span>)を返すような構文のことである。
            特定の処理をサブルーチン化する目的で使用することが多い。

            <SubHeader>関数の基本</SubHeader>
            <Paragraph>
                まずは、関数の典型的な例を見てみよう。

                <PyScript>
                    def add(a, b):
                        sum = a + b
                        return sum

                    print(add(1, 2))
                </PyScript>

                Pythonで関数を定義するには、<span class="text-yellow-400">def</span>句(defineの略記)を用いる。
                関数名には、変数名と同様、原則として任意の文字列を使用することができる。
                関数名の後ろのカッコには、その関数がとる引数を指定する。
                また、戻り値は<span class="text-yellow-400">return</span>句の後に記述する値となる。
                ここで、関数の定義は、関数の呼び出しよりも必ず前に記述されるということに注意してほしい。
            </Paragraph>
            <Paragraph>
                もし後ろに書いた場合は、次の例のように、関数が未定義となってエラーとなってしまう(ただしメソッドはこの限りでない)。

                <PyScript>
                    print(add(1, 2))

                    def add(a, b):
                        sum = a + b
                        return sum
                </PyScript>

                また、関数の引数や戻り値は必ずしも必要ではない。
                特に、関数を定義する目的が処理のサブルーチン化やラッピング(wrapping)である時には、このような関数を定義することは往々にしてあり得る。
                以下は、これらを全く取らない関数の例である。

                <PyScript>
                    def say_hello():
                        print("Hoi zäme!")

                    say_hello()
                </PyScript>
            </Paragraph>

            <SubHeader>再帰関数</SubHeader>
            <Paragraph>
                再帰関数(<span class="text-yellow-400">recursive function</span>)とは、関数の処理内で自身を再帰的に呼び出すような関数のことである。計算科学の文脈では、トップダウン型のアプローチの一つである分割統治法を実現するために使用される。早速、実例を見てみよう。

                <PyScript>
                    def sum(num):
                        if num == 1:
                            return 1
                        else:
                            return sum(num - 1) + num

                    sum(100)
                </PyScript>

                上の例は、与えられた数までの自然数の総和を計算するプログラムである(第2講では、for文を使って実装した)。
                見ての通り、sum()関数の中でsum()関数が再帰的に呼び出されている。
                再帰関数を使うと、for文などを用いるときと比べてシンプルなコードになる傾向がある一方で、メモリ使用量が大きいことや、無限ループに陥らないように注意を払わなければならない欠点がある。
            </Paragraph>

            <SubHeader>ジェネレータ</SubHeader>
            <Paragraph>
                関数の特殊な形態の一つとして、ジェネレータ(<span class="text-yellow-400">generator</span>)が挙げられる。
                ジェネレータは、イテラブルオブジェクトを生成するという点で通常のPythonのコレクション(listやdictなど)に類似しているが、ステートをもつ(=変数の値を保持できる)という点ではクラスに類似しているとも言える。
                とりあえず、例を見てみよう。

                <PyScript>
                    def generator(num):     # ジェネレータ名は任意のもので良い
                        for i in range(num):
                            yield 2 * i + 1

                    for i in generator(5):
                        print(i)
                </PyScript>

                上の例は、奇数を指定した個数返すプログラムである。
                出力されたデータを見ると、list型のようなイテラブルオブジェクトであることが分かる。
                このように、return句の代わりに<span class="text-yellow-400">yield</span>句を指定するだけで、イテラブルの各要素を個別に計算する処理が実装できる。
                これを通常の関数で実装したのが以下である。

                <PyScript>
                    def non_generator(num):
                        output = []
                        for i in range(num):
                            output.append(2 * i + 1)
                        return output

                    for i in non_generator(5):
                        print(i)
                </PyScript>

                上の例では出力される結果は同じだが、ジェネレータの場合には、結果を格納するための変数(配列)が定義されていないことに気づくだろう。
                実は、ジェネレータは結果を逐次掃き出していくので、結果を格納しておく変数が不要なのである。
                したがって、ジェネレータを活用することでメモリの使用量を抑えることができる。
                これは、特にメモリの使用量が大きくなりがちな再帰関数の代替手法として有効な性質である。
            </Paragraph>

            <SubHeader>ラムダ式</SubHeader>
            <Paragraph>
                最後に、ラムダ式(<span class="text-yellow-400">lambda function</span>)について触れておこう。ラムダ式は無名関数とも呼ばれ、わざわざ関数名を与えるほどではない処理に対して、サブルーチンとしてのまとまりを与えるのに使われる。以下に例を示そう。

                <PyScript>
                    example = lambda x: x ** 2
                    
                    print(example(3))
                </PyScript>

                このように、<span class="text-yellow-400">lambda</span>句の後に引数を、コロンの後に戻り値を記述することで、簡易な関数を定義することができる。
                ただし、上の例のようにラムダ式を変数に直接代入して使用することは一般に推奨されない。
                デバッグの際に、def句を用いて関数を定義した場合にはその関数名がトレースバックに表示されるが、ラムダ式では単に&lt;lambda&gt;としか表示されず、トレーサビリティが低下するからである。
            </Paragraph>

            <Paragraph>
                そこで、ラムダ式の実用的な使用例を次にいくつか挙げる。

                <PyScript>
                    # with lambda
                    data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

                    odd_number = list(filter(lambda x: x % 2 == 1, data))
                    print(odd_number)
                </PyScript>

                <PyScript>
                    # without lambda
                    def is_odd(x):
                        return x % 2 == 1

                    data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

                    odd_number = list(filter(is_odd, data))
                    print(odd_number)
                </PyScript>

                上は、<span class="text-yellow-400">filter()</span>関数を用いた典型的な例である。
                filter()関数では、内部的に第二引数のデータをイテレートし、第一引数の関数がTrueを返すような要素のみを戻り値に含める。

                <PyScript>
                    # with lambda
                    data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

                    result = list(map(lambda x: x * ((-1) ** x), data))
                    print(result)
                </PyScript>

                <PyScript>
                    # without lambda
                    def square(x):
                        return x * (-1) ** x

                    data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

                    result = list(map(square, data))
                    print(result)
                </PyScript>

                上は、配列に<span class="text-yellow-400">map()</span>関数を適用した例である。
                map()関数は、配列の各要素に対してある処理を実行したいときに用いることができる。
                引数は、filter()関数と同様である。<br><br>
                このように、ラムダ式は特定の処理・関数との親和性が高く、大抵の場合、上で見た例のように複数の処理に組み合わされて用いられるのが一般である。
            </Paragraph>
        </Paragraph>


        <Header>2.ライブラリ</Header>
        <Paragraph>
            Pythonの特徴の一つとして、その豊富なライブラリ(<span class="text-yellow-400">library</span>)が挙げられる。
            ライブラリとは、便利な関数やクラスがひとまとめになって提供されるパッケージの総称であり、Pythonに標準で搭載される標準ライブラリ(<span class="text-yellow-400">os</span>や<span class="text-yellow-400">math</span>、<span class="text-yellow-400">pip</span>など)と、インターネット等から入手できる外部ライブラリ(<span class="text-yellow-400">pandas</span>や<span class="text-yellow-400">Numpy</span>、<span class="text-yellow-400">OpenCV</span>など)に分けられる。
            また、ライブラリと区別して、Pythonに元から用意されている関数(print, inputなど)やクラス(int, strなど)のことを組み込み関数、組み込み型と呼ぶ場合もある。


            <SubHeader>ライブラリのインストール</SubHeader>
            <Paragraph>
                標準ライブラリはインストール不要だが、外部ライブラリはインターネットからのインストールが必要である。
                ライブラリのインストールは、<span class="text-yellow-400">pip</span>などのパッケージインストーラを介して行うのが一般的である。

                <Code unique_id="1" language="bash" content="pip --version">$ <span class="text-green-600">pip</span> --version</Code>

                上のコマンドで、使用している環境にpipがインストールされているか確認することができる。
                もし"pip: not found"となる場合は、まずpip自体をインストールする必要がある。
                各自、実行しているOSに適した方法でpipのインストールを行うこと。
            </Paragraph>

            <Paragraph>
                pipがインストールされていることを確認したら、今度は外部ライブラリをインストールしてみよう。
                以下のコマンドは、<span class="text-yellow-400">OpenCV</span>と呼ばれる、画像処理の際に用いる外部ライブラリをインストールする。

                <Code unique_id="2" language="bash" content="pip install opencv-python">$ <span class="text-green-600">pip</span> install opencv-python</Code>

                その他、インストールしたいライブラリがある場合は、<a href="https://pypi.org/" class="underline text-blue-200">Python Package Index (PyPI)</a>で検索してみると良い。
                インストールする際のコマンドをコピー&ペーストすることができる。
                
            </Paragraph>

            <SubHeader>ライブラリのインポート</SubHeader>
            <Paragraph>
                ライブラリを使用するには、Pythonのコード内で明示的に呼び出しを宣言する必要がある。
                例えば、以下のようにすること。

                <PyScript>
                    import math

                    print(math.pi)
                    print(math.sqrt(2))
                </PyScript>

                上のように、<span class="text-yellow-400">import</span>句に続けてライブラリ名を記述すれば良い。
                原則として、import句はコードの先頭に置くこと。
                また、ライブラリ名が自分の定義した関数やクラスの名前と衝突する場合や、名前が長すぎて都度記述するのが煩わしい場合には、ライブラリに別名を与えることができる。
                以下がその例である。

                <PyScript>
                    import datetime as dt

                    print(dt.datetime.now())
                </PyScript>

                上のように、<span class="text-yellow-400">as</span>句を付せば良い。
                また、ライブラリから特定の関数だけをインポートしたい場合には、次のようにすることもできる。

                <PyScript>
                    from platform import python_version

                    print(python_version())
                </PyScript>
                
                このように、<span class="text-yellow-400">from</span>句とimport句を組み合わせることによって、特定の関数だけをインポートし、当該ファイルの名前空間にある関数として持ち込むことができる。
                したがって、ライブラリ名の<span class="text-yellow-400">platform</span>は、python_version()関数が呼び出される時点では省略されている。
            </Paragraph>
        </Paragraph>


        <Header>3.最終問題</header>
        <Paragraph>
            問題を解くにあたって必要なライブラリは、全て、あらかじめインポートされています。
            また、今回でPythonの講座は最終回となるので、いつもよりたくさんの問題を用意しました。
            これまで学習した構文が網羅的に問われます。
            ぜひ楽しんで挑戦してください。
        </Paragraph>
        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-green-600 font-bold">Easy</span>] 与えられた2つの自然数の最大公約数を求めるプログラムを書け。</SubHeader>
            <Hint unique_id="easy1">ユークリッドの互除法(Euclidean algorithm)を使うと良い。</Hint>

            <PyScript>
                num1 = 1071
                num2 = 1029

                print(gcd)
            </PyScript>
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-green-600 font-bold">Easy</span>] 次の配列からstr型のデータを全て取り除け。ただし、int型に変換できる場合には取り除かずに変換せよ。</SubHeader>
            <Hint unique_id="easy2"><span class="text-yellow-400">type()</span>、あるいは<span class="text-yellow-400">isinstance()</span>関数を使うことで、データ型を調べられる。</Hint>

            <PyScript>
                data = [3, 0, 7, 'Null', 'N/A', '6', 8, 'None', '5', '4', "2", 9, 1]

                print(data)
            </PyScript>
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-green-600 font-bold">Easy</span>] 与えられた英文を単語ごとに区切り、含まれる単語数をカウントするプログラムを書け。</SubHeader>
            <Hint unique_id="easy3">str型の実態は、配列である。<span class="text-yellow-400">split()</span>関数を使おう。</Hint>

            <PyScript>
                sentence = "Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation."

                print(word_count)
            </PyScript>
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-green-600 font-bold">Easy</span>] フィボナッチ数列の第1項から第n項までを出力するプログラムを書け。ただし、第1項と第2項は1とする。</SubHeader>
            <Hint unique_id="easy4">数列が漸化式で定義される場合、再帰関数との親和性が高い場合が多い。</Hint>

            <PyScript>
                n = 10
                # 続きを書いてね
            </PyScript>
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-yellow-400 font-bold">Medium</span>] 与えられた小文字を大文字に、大文字を小文字にそれぞれ変換するプログラムを書け。</SubHeader>
            <Hint unique_id="med1">"ASCII table"で検索してみよう。きっと分かるはずだ。</Hint>

            <PyScript>
                string = "wELCOME TO rI-ONE!"
                # 続きを書いてね
            </PyScript>
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-yellow-400 font-bold">Medium</span>] sqrt(tan(x))の区間[0, pi/4]における定積分を求めるプログラムを書け。ただし、必要な計算精度は5桁程度とし、math.sqrt()およびmath.tan()を使用しても良いものとする。</SubHeader>
            <Hint unique_id="med2">積分は、その定義(Riemann integral)に立ち返って考えてみること。より精度が求められる場合には、台形積分を考えると良い。(某ヨビノリで見たって? 知らない子ですねえ。)</Hint>

            <PyScript>
                import math

                # 続きを書いてね
            </PyScript>
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-red-500 font-bold">Hard</span>] 以下の配列を、マージソートによって昇順(ascending order)に並べ替え、さらに任意の数nを探索するプログラムを書け。</SubHeader>
            <Hint unique_id="hard1">ソートされたデータに対しては二分探索(<span class="text-yellow-400">binary search</span>)を行おう。</Hint>

            <PyScript>
                n = 9
                data = [5, 9, 3, 6, 2, 1, 3, 7, 8, 0]
                # 続きを書いてね

                print(sorted_data)
            </PyScript>
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-red-500 font-bold">Hard</span>] 6面サイコロを指定回数転がした時、上面にある数字を求めるプログラムを書け。ただし、初期状態は上面を1、正面を3、正面から見て左面を2とし、サイコロは、奥、手前、左、右の4方向に回転できるものとする。</SubHeader>
            <Hint unique_id="hard2">classを用いてステートを管理すると実装しやすい。</Hint>

            <PyScript>
                # 自力で書いてね
            </PyScript>
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-purple-500 font-bold">INSANE</span>] 以下のTakuzuを解くプログラムを書け。ただし、-1は空欄を示している。</SubHeader>
            <Hint unique_id="insane1">Takuzuは、Sudokuに似たパズルゲームである。まずは、インターネットでルールを調べてみると良い。</Hint>

            <PyScript>
                grid = [
                            [ 1, -1, -1, -1, -1,  1],
                            [ 1, -1, -1,  0,  1, -1],
                            [-1,  1,  0, -1, -1, -1],
                            [-1, -1,  1,  0, -1,  1],
                            [-1, -1, -1,  1, -1, -1],
                            [-1, -1, -1, -1,  0, -1]
                        ]

                # 続きを書いてね
                print(filled_grid)
            </PyScript>
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-purple-500 font-bold">INSANE</span>] 以下の暗号を解読せよ。ただし、次に示すコードは暗号化の際に用いられたプログラムである。</SubHeader>
            <Hint unique_id="insane2">これが真の最終問題です。</Hint>

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