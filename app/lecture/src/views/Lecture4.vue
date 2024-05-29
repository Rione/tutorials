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
    <Title>第4講 Python: 関数、pipの利用</Title>

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
                        print("Hello!")

                    say_hello()
                </PyScript>
            </Paragraph>

            <SubHeader>再帰関数</SubHeader>
            <Paragraph>
                
            </Paragraph>

            <SubHeader>ジェネレータ</SubHeader>
            <Paragraph>
                関数の特殊な形態の一つとして、ジェネレータ(<span class="text-yellow-400">generator</span>)が挙げられる。
                ジェネレータは、イテラブルオブジェクトを生成するという点で通常のPythonのコレクション(listやdictなど)に類似しているが、ステートをもつという点でクラスに類似しているとも言える。
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

            <Paragraph>
                
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

            <SubHeader>要素の追加、削除</SubHeader>
            <Paragraph>
                配列に要素を追加するためには、いくつかの方法がある。代表的なものを以下に挙げる。

                <PyScript>
                    food = ['Apple', 'Banana', 'Cherry', 'Durian', 'Eggplant']

                    food.append('Fennel')
                    print(food)
                </PyScript>

                <PyScript>
                    food = ['Apple', 'Banana', 'Cherry', 'Durian', 'Eggplant']

                    food += ['Fennel']
                    print(food)
                </PyScript>

                <PyScript>
                    food = ['Apple', 'Banana', 'Cherry', 'Durian', 'Eggplant']

                    food.insert(5, 'Fennel')
                    print(food)
                </PyScript>
            </Paragraph>

            <Paragraph>
                配列の要素を削除するためにも、いくつかの方法がある。代表的なものを以下に挙げる。

                <PyScript>
                    food = ['Apple', 'Banana', 'Cherry', 'Durian', 'Eggplant']

                    food.remove('Eggplant')
                    print(food)
                </PyScript>

                <PyScript>
                    food = ['Apple', 'Banana', 'Cherry', 'Durian', 'Eggplant']

                    food.pop(4)
                    print(food)
                </PyScript>

                <PyScript>
                    food = ['Apple', 'Banana', 'Cherry', 'Durian', 'Eggplant']

                    del food[4]
                    print(food)
                </PyScript>

                <PyScript>
                    food = ['Apple', 'Banana', 'Cherry', 'Durian', 'Eggplant']

                    food = [i for i in food if i != 'Eggplant']
                    print(food)
                </PyScript>
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
                    sequence1 = [0, 1, 2, 3, 5, 8, 13]
                    sequence2 = sequence1           # shallow copy

                    print(f'Before: seq1 = {sequence1}')
                    print(f'Before: seq2 = {sequence2}')

                    sequence1[0] = 1                # コピーの参照元を書き換え

                    print(f'After: seq1 = {sequence1}')
                    print(f'After: seq2 = {sequence2}')
                </PyScript>

                上の例は、コピーの参照元を書き換えると、コピーした配列の値も書き変わることを示している。
                shallow copyでは、コピーされるのはコピー元のオブジェクト(変数)のみであり、実体となるメモリ上のデータは共有される。
                つまり、同じデータに対して異なる変数名を使ってアクセスしていることに相違ない。
            </Paragraph>

            <Paragraph>
                配列をdeep copyしたい場合には、copyモジュールの<span class="text-yellow-400">deepcopy()</span>関数を使うか、以下のように、for文で各要素を一つずつコピーする方法がある。

                <PyScript>
                    food = ['Apple', 'Banana', 'Cherry', 'Durian', 'Eggplant']
                    new_food = [i for i in food]

                    food[0] = 'Avocado'

                    print(f'food: {food}')
                    print(f'new_food: {new_food}')
                </PyScript>
            </Paragraph>

            <SubHeader>おまけ: 多次元配列</SubHeader>
            <Paragraph>
                これまで見てきた配列は、すべて<span class="text-yellow-400">1次元配列</span>(one-dimensional array, linear array)であった。
                つまり、要素が一方向のみに増えていく1次元的な配列である。
                これに対し、要素がn方向に向かって増えていくものを一般に<span class="text-yellow-400">n次元配列</span>(n-dimensional array)と呼ぶ。
                以下は、2次元配列の例である。

                <PyScript>
                    matrix = [
                                [1, 2, 3],
                                [4, 5, 6],
                                [7, 8, 9]
                            ]

                    print(matrix[1][2])
                </PyScript>

                ここで、配列が数学のベクトルや行列と似た概念であることに気づいた人がいるかもしれない。
                実際、計算科学の文脈では配列のことをベクトルと呼ぶ場合もあるようである。
            </Paragraph>
        </Paragraph>


        <Header>2.辞書</Header>
        <Paragraph>
            配列について理解できれば、辞書(<span class="text-yellow-400">dictionary</span>)を理解するのはそれほど難しいことではない。なぜなら、辞書は配列のindexの代わりに任意のキー(<span class="text-yellow-400">key</span>)を用いるに過ぎないからである。

            <SubHeader>辞書の基本</SubHeader>
            <Paragraph>
                とりあえず、辞書の実例を見てみるとしよう。

                <PyScript>
                    me = {"name": "John", "age": 10, "hobby": "video game"}

                    print(me["name"])
                </PyScript>

                このようにして、辞書は各要素にkey("name", "age", "hobby")を割り当てることができる。
                要素にアクセスする際は、indexの代わりにkeyを用いる。
                要素の順番を意識する必要がある配列とは異なり、keyを使用することで、任意の要素を絶対的に取り出すことができる。
                当然ながら、keyは一意でなければならない。
            </Paragraph>

            <Paragraph>
                keyを使うということ以外は、ほとんど配列と変わらない。
                以下は、辞書の要素を書き換える例である。

                <PyScript>
                    me = {"name": "John", "age": 10, "hobby": "video game"}

                    me["name"] = "Tom"
                    print(me["name"])
                </PyScript>
            </Paragraph>

            <SubHeader>辞書とfor文</SubHeader>
            <Paragraph>
                辞書には、要素の他にkeyが存在するため、for文ではその両方を取り出すことが可能である。
                以下の例を見てみよう。

                <PyScript>
                    me = {"name": "John", "age": 10, "hobby": "video game"}

                    for k, v in me.items():
                        print(f'{k}: {v}')
                </PyScript>

                配列のように、辞書単体をfor文に渡すことはできず、辞書のクラスメソッドである<span class="text-yellow-400">items()</span>関数を先に呼び出さねばならない。
                すると、for文の1番目のindex(k)にはkeyが、2番目のindex(v)には要素の値(value)が渡される。
            </Paragraph>

            <SubHeader>要素の追加、削除</SubHeader>
            <Paragraph>
                辞書に要素を追加するためには、keyを指定する必要があることに注意しよう。
                以下に代表的な方法を示す。

                <PyScript>
                    desktop = {"os": "Windows 11", "cpu": "Core i9-14900K"}

                    desktop["gpu"] = "RTX 4090"
                    print(desktop)
                </PyScript>

                <PyScript>
                    desktop = {"os": "Windows 11", "cpu": "Core i9-14900K"}

                    desktop.update(gpu="RTX 4090")
                    print(desktop)
                </PyScript>

                <PyScript>
                    desktop = {"os": "Windows 11", "cpu": "Core i9-14900K"}

                    desktop.update({"gpu": "RTX 4090"})
                    print(desktop)
                </PyScript>
            </Paragraph>

            <SubHeader>配列と辞書</SubHeader>
            <Paragraph>
                配列と辞書は、互いに入れ子になることが可能である。
                具体例を見てみるとしよう。

                <PyScript>
                    arr1 = [1, 2, 3]
                    arr2 = [4, 5, 6]
                    dict = {"array1": arr1, "array2": arr2}

                    print(dict)
                </PyScript>

                <PyScript>
                    person1 = {"name": "Mike", "age": 50}
                    person2 = {"name": "Josh", "age": 20}
                    arr = [person1, person2]
                    
                    print(arr)
                </PyScript>

                このようにして、多重なる階層を持つ配列・辞書を作ることも可能である。
            </Paragraph>
        </Paragraph>


        <Header>3.練習問題</header>
        <Paragraph>
            近日公開! 乞うご期待
        </Paragraph>

        <ProgressFooter :progress="completion" class="mt-16" />
        <div class="text-center my-5">
            <a href="#" class="p-2 rounded-md bg-green-700 hover:bg-green-600">ページ上部へ!</a>
        </div>
    </div>
</template>

<style scoped>
</style>