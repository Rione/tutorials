<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import { useRouter } from 'vue-router';
    import Title from '../components/Title.vue';
    import Header from '../components/Header.vue';
    import SubHeader from '../components/SubHeader.vue';
    import Paragraph from '../components/Paragraph.vue';
    import PyScript from '../components/PyScript.vue';
    import Code from '../components/Code.vue';
    import Hint from '../components/Hint.vue';
    import ProgressFooter from '../components/ProgressFooter.vue';

    const router = useRouter()
    const completion = ref(0);

    const navigate = (index) => {
        router.push({
            name: 'lecture',
            params: {
                number: index
            } 
        })
    }

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
    <Title>演習問題 解答・解説</Title>

    <div class="container w-full sm:w-5/6 md:w-4/6 mx-auto mb-10 text-start">
        <div class="flex-col mx-auto mb-12 border rounded-lg border-green-600 p-3.5">
            <span class="text-2xl ml-2">目次</span><br>
                <ul class="ml-5 mt-3">
                    <li><a href="#1" class="hover:underline hover:text-2xl hover:text-green-600 decoration-green-600">第1講 Python: データ型、変数、演算子</a></li>
                    <li><a href="#2" class="hover:underline hover:text-2xl hover:text-green-600 decoration-green-600">第2講 Python: if文、for文、while文</a></li>
                    <li><a href="#3" class="hover:underline hover:text-2xl hover:text-green-600 decoration-green-600">第3講 Python: 配列、辞書</a></li>
                    <li><a href="#4" class="hover:underline hover:text-2xl hover:text-green-600 decoration-green-600">第4講 Python: 関数、ライブラリ</a></li>
                </ul>
        </div>
        <Header id="1">第1講 Python: データ型、変数、演算子</Header>
        <Paragraph>
            <div class="-my-3 underline text-blue-500 hover:text-blue-300" @click="navigate(1)">第1講 Python: データ型、変数、演算子のページへ</div>
        </Paragraph>
        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-green-600 font-bold">Easy</span>] 入力される名前を、"Your name is XXX."のように出力するプログラムを書け。</SubHeader>
            <Hint unique_id="1_easy"><span class="text-yellow-400">input()</span>関数を使うと、入力された文字列を取得できる。</Hint>

            <PyScript>
                name = input()

                print(f"Your name is {name}.")
            </PyScript>

            別解として、print("Your name is " + name)とすることもできるが、文字列のフォーマット(<span class="text-yellow-400">format</span>)を行った方が可読性が高い(と思う)。
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-yellow-400 font-bold">Medium</span>] 入力される2数(num1, num2)の平均を求めるプログラムを書け。</SubHeader>
            <Hint unique_id="1_med1">input()関数から返されるデータは、<span class="text-yellow-400">str</span>型であることに注意しよう。</Hint>

            <PyScript>
                num1 = input()
                num2 = input()
                
                print(f"The average is {(float(num1) + float(num2)) / 2}")
            </PyScript>

            input()関数の戻り値は必ずstr型であるので、演算をする前にint型やfloat型などの演算可能な型にキャストしておくこと。
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-yellow-400 font-bold">Medium</span>] 次のプログラムの誤りを指摘し、修正せよ。</SubHeader>
            <Hint unique_id="1_med2">プログラムは、括弧の内側から順に評価される。</Hint>

            <PyScript>
                a = input()         # aに任意の数を代入
                b = input()         # bに任意の数を代入
                # print(float(a + b)) # aとbの和を出力

                # 正しいプログラム
                print(float(a) + float(b))
            </PyScript>

            前問と同様。上のコードではstr型を加えてしまっているので、先にfloat型へキャストすること。
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-red-500 font-bold">Hard</span>] 1番目の整数(num1)から2番目の整数(num2)を引いた結果を出力するプログラムを書け。ただし、算術演算子のうち使えるのは + のみとする。</SubHeader>
            <Hint unique_id="1_hard"><span class="text-yellow-400">ビット演算</span>について調べてみよう。</Hint>

            <PyScript>
                num1: int = 10
                num2: int = 8
                
                answer = num1 + (~num2 + 1)
                print(f"The answer is {answer}")
            </PyScript>

            ビット演算子のうちのビット反転(~)を利用して、2の補数表現を作ること。
            さらに詳しく知りたい場合は、ビット演算の仕組みをインターネットで検索してみよう。
        </Paragraph>

        <Header id="2">第2講 Python: if文、for文、while文</Header>
        <Paragraph>
            <div class="-my-3 underline text-blue-500 hover:text-blue-300" @click="navigate(2)">第2講 Python: if文、for文、while文のページへ</div>
        </Paragraph>
        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-green-600 font-bold">Easy</span>] 1以上x未満の範囲に含まれる奇数の総和を求めるプログラムを書け。</SubHeader>
            <Hint unique_id="2_easy1"><span class="text-yellow-400">range()</span>関数を使うと、list型(厳密にはrange型)の数列を取得できる。</Hint>

            <PyScript>
                x: int = 100
                
                answer = 0
                for i in range(1, x):
                    if i % 2 == 1:
                        answer += i

                print(f"The sum is {answer}")
            </PyScript>

            1以上x未満の範囲にある整数は、range(1, x)とすることで得られる。
            あとは、奇数の条件分岐を忘れないようにすること。
            上の例では、mod(2)が1に等しいことから奇数を判定している。
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-green-600 font-bold">Easy</span>] 次のプログラムのエラーの原因を特定し、修正せよ。</SubHeader>
            <Hint unique_id="2_easy2">宣言されていない変数は呼び出せない。</Hint>

            <PyScript>
                sum = 0

                # 追加したコード
                flag = True

                while (flag):
                    sum += 1
                    if (sum > 5):
                        flag = False
                print('Correct!')
            </PyScript>

            定義されていない変数flagがいきなり呼び出されていたことでエラーが発生していた。
            したがって、flagを呼び出しより先に宣言してやれば良い。
            (題意が不明瞭だったかもしれませんね。すみません。)
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-yellow-400 font-bold">Medium</span>] 入力された自然数に対して、適切な序数を出力するプログラムを書け。例えば、1が入力された時に"1st"を返すこと。</SubHeader>
            <Hint unique_id="2_med">1の位の数に応じて条件分岐させること。ただし、例外がいくつか存在するので注意せよ。</Hint>

            <PyScript>
                num = int(input())

                if (num % 100 // 10) == 1:  # (mod(100)した結果を10で割った商の整数部) == 1
                    print(str(num) + 'th')
                elif (num % 10) == 1:
                    print(str(num) + 'st')
                elif (num % 10) == 2:
                    print(str(num) + 'nd')
                elif (num % 10) == 3:
                    print(str(num) + 'rd')
                else:
                    print(str(num) + 'th')
            </PyScript>

            ここでのポイントは、10の位が1の時(12, 113など)は、序数詞が必ず"th"となることである。
            したがって、それを優先的に判定することが必要となる。
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-red-500 font-bold">Hard</span>] 任意の実数x(rad)に対して、sin(x)の値を出力するプログラムを書け。ただし、必要な計算精度は10桁程度とし、以下のpiの値を利用しても良いものとする。</SubHeader>
            <Hint unique_id="2_hard">関数の周期性を利用することで効率的なコードが書ける。</Hint>

            <PyScript>
                pi: float = 3.14159265359
                x: float = pi / 2

                # sin(x)を 0 <= x <= pi/2 の範囲で表現する 
                if (pi / 2 < x and x <= pi):
                    x = pi - x
                elif (pi < x < 2 * pi):
                    x = x - pi
                elif (x >= 2 * pi):
                    x = x % 2 * pi

                # Maclaurin展開の実装部
                sum = 0
                for i in range(10):
                    # 階乗(factorial)を計算するためのfor文
                    fact = 1
                    for j in range(1, 2*i+1 +1):
                        fact *= j
                    sum += ((-1)**i) * (x**(2*i+1)) / fact

                print(f'sin({x}) = {sum}')
            </PyScript>

            Maclaurin展開を実装すれば良い。
            注意すべき点としては、xの値が原点から離れるほど精度が低下するため、xをなるべく原点に近い点に置き直すことが必要となる。
        </Paragraph>

        <Header id="3">第3講 Python: 配列、辞書</Header>
        <Paragraph>
            <div class="-my-3 underline text-blue-500 hover:text-blue-300" @click="navigate(3)">第3講 Python: 配列、辞書のページへ</div>
        </Paragraph>
        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-green-600 font-bold">Easy</span>] 次のデータを正規化せよ。</SubHeader>
            <Hint unique_id="3_easy">グレイスケール(8bit)ですね。</Hint>

            <PyScript>
                data = [
                    [133, 254,   0, 233,  45],
                    [230,  43, 198, 172,  85],
                    [ 75, 189,  34, 210, 222],
                    [ 43, 240,  65, 184, 202],
                    [139,  14,  78, 255, 164]
                ]

                # データの値を一つずつ確認して、最小値と最大値を求める
                min = data[0][0]
                max = data[0][0]
                for i in range(len(data)):
                    for j in range(len(data[i])):
                        if data[i][j] > max:
                            max = data[i][j]
                        elif data[i][j] < min:
                            min = data[i][j]

                # データを正規化する
                normalized_data = []
                for i in range(len(data)):
                    array = []
                    for j in range(len(data[i])):
                        array.append((data[i][j] - min) / (max - min))
                    normalized_data.append(array)

                # 結果を表示
                print('[')
                for array in normalized_data:
                    print(f"{array},")
                print(']')
            </PyScript>

            データの最小値と最大値を求めるためにfor文を実装し、さらにデータを正規化するためにもう一度for文を使用する。
            グレイスケールの値は必ず[0, 255]の範囲に存在することが分かっているので、このことを利用してもよい。
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-yellow-400 font-bold">Medium</span>] 次のデータを昇順(ascending order)に並べ替えよ。ただし、バブルソートを使うこと。</SubHeader>
            <Hint unique_id="3_med1">各データが泡のように浮かび上がってきます。</Hint>

            <PyScript>
                data = [5, 9, 3, 6, 2, 1, 4, 7, 8, 0]

                # bubble sort
                for i in range(len(data) - 1):
                    for j in range(len(data) - i - 1):
                        if data[j] > data[j+1]:
                            data[j], data[j+1] = data[j+1], data[j]
                            # 上の1行の代わりに、下の3行を使うこともできる
                            # data[j] = tmp 
                            # data[j] = data[j+1]
                            # data[j+1] = tmp
                            print(data)

                print(data)
            </PyScript>

            隣り合うデータをそれぞれ比較し、より大きい値が常に右側に来るように入れ替え続けると、最も大きい値が配列の右端に来る。これを繰り返すこと。
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-yellow-400 font-bold">Medium</span>] 行列Aと行列Bの積を求めよ。</SubHeader>
            <Hint unique_id="3_med2">定義通りに計算しよう。(※手計算しないでね)</Hint>

            <PyScript>
                A = [
                        [1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 9],
                    ]
                B = [
                        [-1,  0,  1],
                        [ 0,  1, -1],
                        [ 1, -1, -1]
                    ]

                # 行列の積が定義されるかを確認
                if len(A[0]) != len(B):
                    print("Matrix A can't be multiplied by matrix B.")
                else:
                    C = [[0] * len(B[0]) for _ in range(len(A))]

                    # 計算部
                    for i in range(len(A)):
                        for j in range(len(B[0])):
                            for k in range(len(B)):
                                C[i][j] += A[i][k] * B[k][j] 

                    # 結果を表示
                    print('[')
                    for array in C:
                        print(f"{array},")
                    print(']')
            </PyScript>

            定義通りにfor文を実装するだけだが、これがなかなかややこしいのである。
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-yellow-400 font-bold">Medium</span>] データAとデータBの相関係数を求めよ。</SubHeader>
            <Hint unique_id="3_med3">平方根は、<span class="text-yellow-400">math.sqrt()</span>関数で計算できる。</Hint>

            <PyScript>
                import math

                data_A = [ 0,  3,  5,  9, -2,  1,  2, -4,  7,  8]
                data_B = [ 3, 12,  6,  5,  4, -2,  3, -1,  9,  7]

                # 平均値を計算
                avr_A = 0
                avr_B = 0
                for i in range(len(data_A)):
                    avr_A += data_A[i] / len(data_A)
                    avr_B += data_B[i] / len(data_B)

                # 相関係数を計算
                cov_AB = 0
                sd_A = 0
                sd_B = 0
                for i in range(len(data_A)):
                    dev_A = data_A[i] - avr_A
                    dev_B = data_B[i] - avr_B

                    cov_AB += dev_A * dev_B
                    sd_A += dev_A ** 2
                    sd_B += dev_B ** 2
                cor_AB = cov_AB / math.sqrt(sd_A * sd_B)

                print(cor_AB)
            </PyScript>

            こちらも定義式に当てはめて実装すれば良いのだが、for文がいくつも出てくるので、落ち着いてやらなければ混乱してしまう。
            もし解けた場合は、二つのデータ(AとB)をベクトルとして見た場合のcos類似度(cosine similarity)も計算してみると良い。
            そうすると、内積と相関係数が深い関係にあることに気づくはずである。
        </Paragraph>

        <Header id="4">第4講 Python: 関数、ライブラリ</Header>
        <Paragraph>
            <div class="-my-3 underline text-blue-500 hover:text-blue-300" @click="navigate(4)">第4講 Python: 関数、ライブラリ</div>
        </Paragraph>
        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-green-600 font-bold">Easy</span>] 与えられた2つの自然数の最大公約数を求めるプログラムを書け。</SubHeader>
            <Hint unique_id="4_easy1">ユークリッドの互除法(Euclidean algorithm)を使うと良い。</Hint>

            <PyScript>
                num1 = 1071
                num2 = 1029

                # ユークリッドの互除法
                while num2 != 0:
                    num1, num2 = num2, num1 % num2
                    # 以下のように書いても良い
                    # tmp = num2
                    # num2 = num1 % num2
                    # num1 = tmp 

                print(f"GCD: {num1}")
            </PyScript>

            ユークリッドの互除法を実行すれば良い。
            あまりが0になった時、num1がnum2で割り切れたことになるので、割る数のnum2が最大公約数となる。
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-green-600 font-bold">Easy</span>] 次の配列からstr型のデータを全て取り除け。ただし、int型に変換できる場合には取り除かずに変換せよ。</SubHeader>
            <Hint unique_id="4_easy2"><span class="text-yellow-400">type()</span>、あるいは<span class="text-yellow-400">isinstance()</span>関数を使うことで、データ型を調べられる。</Hint>

            <PyScript>
                data = [3, 0, 7, 'Null', 'N/A', '6', 8, 'None', '5', '4', "2", 9, 1]

                # 削除された要素分のindexを前倒しする
                offset = 0
                for i in range(len(data)):
                    # 文字列型の判定
                    if type(data[i - offset]) is str:
                        # 数値の判定
                        if data[i - offset].isdigit():
                            data[i - offset] = int(data[i - offset])
                        else:
                            del data[i - offset]
                            offset += 1

                print(data)
            </PyScript>

            要素を削除すると、その分indexがずれていくということが難点である。
            上では、indexにoffsetを付してこの現象を回避しているが、新たな配列を用意し、そこに要素を移していくことでも同様の動作が実現できる。
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-green-600 font-bold">Easy</span>] 与えられた英文を単語ごとに区切り、含まれる単語数をカウントするプログラムを書け。</SubHeader>
            <Hint unique_id="4_easy3">str型の実態は、配列である。<span class="text-yellow-400">split()</span>関数を使おう。</Hint>

            <PyScript>
                sentence = "Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation."

                words = sentence.split(" ")
                word_count = len(words)

                print(words)
                print(word_count)
            </PyScript>

            str型のメンバ関数であるsplit()関数を使えば良い。
            ここでは、空白(" ")ごとに区切るようにしている。
            あとは、得られた配列の要素数をlen()関数で数え上げること。
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-green-600 font-bold">Easy</span>] フィボナッチ数列の第1項から第n項までを出力するプログラムを書け。ただし、第1項と第2項は1とする。</SubHeader>
            <Hint unique_id="4_easy4">数列が漸化式で定義される場合、再帰関数との親和性が高い場合が多い。</Hint>

            <PyScript>
                n = 10

                # ジェネレータ関数
                def fibonacci(num):
                    a, b = 0, 1
                    for _ in range(num):
                        a, b = b, a + b
                        yield a

                fib_series = []
                for i in fibonacci(n):
                    fib_series.append(i)

                print(fib_series)
            </PyScript>

            配列内の隣り合う整数同士を加え、それを新たにその配列の末尾に付け加えるという操作をすれば良い。
            ここでは、ステート(aとbの値)を保持するためにジェネレータを利用し、わざわざ配列の隣り合う整数を参照しなくても良いようにしているが、漸化式のように、再帰呼び出しを利用する方法もある。
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-yellow-400 font-bold">Medium</span>] 与えられた小文字を大文字に、大文字を小文字にそれぞれ変換するプログラムを書け。</SubHeader>
            <Hint unique_id="4_med1">"ASCII table"で検索してみよう。きっと分かるはずだ。</Hint>

            <PyScript>
                string = "wELCOME TO rI-ONE!"

                new_string = ""
                for c in string:
                    # 大文字の場合
                    if(65 <= ord(c) <= 90):
                        new_string += chr(ord(c) + 32)
                    # 小文字の場合
                    elif(97 <= ord(c) <= 122):
                        new_string += chr(ord(c) - 32)
                    # それ以外(記号)の場合
                    else:
                        new_string += c

                print(new_string)
            </PyScript>

            それぞれの文字には、ASCIIコードという一意の数値が割り当てられているため、その値を比較することで文字列の操作を行うことができる。
            ASCIIコードは、ord()関数によって得ることができる。
            一つの文字の大文字と小文字の間には32の値の差があるため、それを加減すれば良い。
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-yellow-400 font-bold">Medium</span>] sqrt(tan(x))の区間[0, pi/4]における定積分を求めるプログラムを書け。ただし、必要な計算精度は5桁程度とし、math.sqrt()およびmath.tan()を使用しても良いものとする。</SubHeader>
            <Hint unique_id="4_med2">積分は、その定義(Riemann integral)に立ち返って考えてみること。より精度が求められる場合には、台形積分を考えると良い。(ヨビノリで見たって? 知らない子ですねえ。)</Hint>

            <PyScript>
                import math

                # 分割数からxの変化量を計算
                n_split = 100000
                dk = (math.pi / 4 - 0) / n_split

                # 関数
                def f(x):
                    return math.sqrt(math.tan(x))

                # 台形公式
                sum = 0.0
                for i in range(n_split):
                    sum += f(dk * i) + f(dk * (i + 1))
                sum *= dk / 2

                print(sum)
            </PyScript>

            リーマンによる積分の定義に則り、与えられた領域を細長い短冊状の長方形で分割することを考える。
            この短冊の数を無限大に近づける、つまり、短冊の幅を0に近づければ求める面積に収束することから、n_splitの値を大きくすればするほど、精度が向上する。
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-red-500 font-bold">Hard</span>] 以下の配列を、マージソートによって昇順(ascending order)に並べ替え、さらに配列の任意の要素nを探索するプログラムを書け。</SubHeader>
            <Hint unique_id="4_hard1">ソートされたデータに対しては二分探索(<span class="text-yellow-400">binary search</span>)を行おう。</Hint>

            <PyScript>
                n = 9
                data = [5, 9, 4, 6, 2, 1, 3, 7, 8, 0]

                # 与えられた配列を限界まで二分してソートする関数
                def merge_sort(array):
                    if(len(array) == 1):
                        return array

                    left = array[:(len(array) // 2)]
                    right = array[(len(array) // 2):]

                    # 再帰呼び出し
                    left = merge_sort(left)
                    right = merge_sort(right)

                    return merge(left, right)

                # 大小比較を行い、新たに一つの配列を返す関数
                def merge(left, right):
                    result = []
                    index_l, index_r = 0, 0
                    
                    # 大小比較
                    while (index_l < len(left)) and (index_r < len(right)):
                        if(left[index_l] <= right[index_r]):
                            result.append(left[index_l])
                            index_l += 1
                        else:
                            result.append(right[index_r])
                            index_r += 1

                    # 余った要素をマージ
                    if(index_l == len(left)):
                        result += right[index_r:]
                    elif(index_r == len(right)):
                        result += left[index_l:]
                            
                    return result

                # 二分探索(binary search)する関数
                def search(array, target):
                    min, max = 0, len(array) - 1

                    while min <= max:
                        mid = (min + max) // 2
                        if(array[mid] == target):
                            return mid
                        elif(array[mid] > target):
                            max = mid - 1
                        else:
                            min = mid + 1

                    return -1

                sorted_data = merge_sort(data)
                print(sorted_data)
                index = search(sorted_data, n)
                print(index)
            </PyScript>

            マージソートは、2つの配列を並び替えて結合するという操作を再帰的に実行するアルゴリズムである。
            したがって、上のmerge_sort()関数内では、merge()関数や自身が頻繁に呼び出されていることに気付くだろう。
            二分探索は、データが並び替えられているときに有効な手法である。
            大幅にステップ数を削減できるので、場合によっては、ソートをしてから探索する方が全体の計算量が減ることもある。
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-red-500 font-bold">Hard</span>] 6面サイコロを指定回数転がした時、上面にある数字を求めるプログラムを書け。ただし、初期状態は上面を1、正面を3、正面から見て左面を2とし、サイコロは、奥、手前、左、右の4方向に回転できるものとする。</SubHeader>
            <Hint unique_id="4_hard2">classを用いてステートを管理すると実装しやすい。</Hint>

            <PyScript>
                # サイコロのクラス
                class Dice:
                    def __init__(self):
                        self.state = {
                            "top": 1,
                            "bottom": 6,
                            "front": 3,
                            "back": 4,
                            "left": 2,
                            "right": 5
                        }

                    # 要素を羅列する関数
                    def show_state(self):
                        for k, v in self.state.items():
                            print(f"{k}: {v}") 

                    # 前面に回転する関数
                    def rot_front(self):
                        self.state["top"], self.state["front"], self.state["bottom"], self.state["back"] = \
                        self.state["back"], self.state["top"], self.state["front"], self.state["bottom"]
                        
                    # 背面に回転する関数
                    def rot_back(self):
                        self.state["top"], self.state["front"], self.state["bottom"], self.state["back"] = \
                        self.state["front"], self.state["bottom"], self.state["back"], self.state["top"]
                        
                    # 左面に回転する関数
                    def rot_left(self):
                        self.state["top"], self.state["left"], self.state["bottom"], self.state["right"] = \
                        self.state["left"], self.state["bottom"], self.state["right"], self.state["top"]
                    
                    # 右面に回転する関数
                    def rot_right(self):
                        self.state["top"], self.state["left"], self.state["bottom"], self.state["right"] = \
                        self.state["right"], self.state["top"], self.state["left"], self.state["bottom"]

                # サイコロをインスタンス化
                dice = Dice()

                # サイコロの回転
                dice.rot_front()
                dice.rot_left()

                # 結果を表示
                dice.show_state()
            </PyScript>

            この問題の場合、サイコロには面というステートと回転というメソッドが割り当てられることになる。
            このように、物体の状態や関数をまとめて管理する場合には、クラスを利用すると良い。
            クラスでは、インスタンスごとに個別のステートを持たせることができる。
            これは、<span class="text-yellow-400">オブジェクト指向</span>(Object-Oriented Programming, OOP)に通じる概念である。
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-purple-500 font-bold">INSANE</span>] 以下のTakuzuを解くプログラムを書け。ただし、-1は空欄を示している。</SubHeader>
            <Hint unique_id="4_insane1">Takuzuは、Sudokuに似たパズルゲームである。まずは、インターネットでルールを調べてみると良い。</Hint>

            <PyScript>
                grid = [
                            [ 1, -1, -1, -1, -1,  1],
                            [ 1, -1, -1,  0,  1, -1],
                            [-1,  1,  0, -1, -1, -1],
                            [-1, -1,  1,  0, -1,  1],
                            [-1, -1, -1,  1, -1, -1],
                            [-1, -1, -1, -1,  0, -1]
                        ]


                # 与えられたグリッドがルールを満たすか判定する関数
                def validate(grid, row, col, num):
                    N = len(grid)
                    
                    # 同じ数字が3つ以上連続する場合
                    if ((1 < col and grid[row][col-2] == grid[row][col-1] == grid[row][col]) \
                        or (0 < col < N-1 and grid[row][col-1] == grid[row][col] == grid[row][col+1]) \
                        or (col < N-2 and grid[row][col] == grid[row][col+1] == grid[row][col+2])):
                            return False
                    elif ((1 < row and grid[row-2][col] == grid[row-1][col] == grid[row][col]) \
                        or (0 < row < N-1 and grid[row-1][col] == grid[row][col] == grid[row+1][col]) \
                        or (row < N-2 and grid[row][col] == grid[row+1][col] == grid[row+2][col])):
                            return False

                    # 同じ行・列に含まれる0と1の数が異なる場合
                    if ((grid[row].count(num) > N // 2) \
                        or ([grid[i][col] for i in range(N)].count(num) > N // 2)):
                            return False

                    # 同じ行・列が2つ以上存在する場合
                    for i in range(N):
                        if ((i != row and grid[i] == grid[row]) \
                            or (i != col and [grid[j][i] for j in range(N)] == [grid[j][col] for j in range(N)])):
                                return False

                    return True

                # バックトラッキングを実行する関数
                def solve_takuzu(grid):
                    N = len(grid)

                    def solve():
                        # 全ての空欄(-1)について反復
                        for row in range(N):
                            for col in range(N):
                                if grid[row][col] == -1:
                                    for value in [0, 1]:
                                        grid[row][col] = value
                                        if validate(grid, row, col, value):
                                            # もし満たしていれば、同じプロセスを再帰的に続ける
                                            if solve():
                                                return True
                                        # 満たしていなければ、別の数字(1)を試す
                                        grid[row][col] = -1
                                    return False
                        return True

                    if solve():
                        return grid
                    else:
                        return None

                filled_grid = solve_takuzu(grid)
                if filled_grid:
                    for i in filled_grid:
                        print(i)
                else:
                    print("The takuzu is unsolvable.")
            </PyScript>

            パズルを解くためのアルゴリズムの一つである、バックトラッキング(backtracking)を利用した方法を上に示した。
            バックトラッキングは、総当たり法の一種であるが、ある状態が条件を満たさないと分かった時点で、その状態から派生する全ての可能性を排除して調べていくという点で、より効率的な方法である。
            途中で再帰呼び出しが行われていることに注目しよう。
        </Paragraph>

        <Paragraph>
            <SubHeader class="mb-3">[<span class="text-purple-500 font-bold">INSANE</span>] 与えられたRSA公開鍵をもとに暗号文を解読せよ。ただし、デコードの際に以下のint_to_ascii()関数を使って良いものとする。</SubHeader>
            <Hint unique_id="4_insane2">M ** eの値がNより僅かに大きくなるように調整されているため、多少の工夫を要する。</Hint>

            <Code unique_id="3" language="RSA" content="">
                Public key:<br>
                N: 1615765684321463054078226051959887884233678317734892901740763321135213636796075462401950274602405095138589898087428337758445013281488966866073355710771864671726991918706558071231266976427184673800225254531695928541272546385146495736420261815693810544589811104967829354461491178200126099661909654163542661541699404839644035177445092988952614918424317082380174383819025585076206641993479326576180793544321194357018916215113009742654408597083724508169216182008449693917227497813165444372201517541788989925461711067825681947947471001390843774746442699739386923285801022685451221261010798837646928092277556198145662924691803032880040492762442561497760689933601781401617086600593482127465655390841361154025890679757514060456103104199255917164678161972735858939464790960448345988941481499050248673128656508055285037090026439683847266536283160142071643015434813473463469733112182328678706702116054036618277506997666534567846763938692335069955755244438415377933440029498378955355877502743215305768814857864433151287<br>
                e: 3<br><br>

                Cypher: 578069870094530462351261328666948515767897554502658120071907233783580395970131001941243908494353148130204366040277222739367513876346540027310848869067907765165251877924898614648219428930415010995973046665081910009013380837528607284315379785254404418467244979703868133847909433979017006731168734225226472367645374395273402314286134258138147136887254193694936530170957338675981316104803406001670063727851563932586592183827560674752708484474164406580399785727963997213948258953551891509104817116121684614878730582087330564032458592680194321481011243419888004168330070726256067503306799123195083232571209881050644598831117799547485331699050071488203534328420973557149080164022632732481301962959025169938525829991464491884077802994023313240938074001642044266215311806357886616275047721584982489250738342064045493889514303566889174037589093135573068541792703611394285169278753880997372788879561060315177893555376509936461335252720144979668267713455875089986569293335492620674584708415004907231317347924827333088
            </Code>

            暗号化に使ったコード(答えではありません):
            <PyScript>
                def ascii_to_int(ascii_str):
                    hex_str = ""
                    for char in ascii_str:
                        # ASCIIコードを16進数に変換
                        hex_str += format(ord(char), 'x')

                    return int(hex_str, 16)

                plaintext = '%^38#%#@3u09uehf9}0uG&63#$_920{@$Congratulations!k0&$KR)%^ER{WE}@{RT}{@$!$HW2hgwJ{W}G|":{45FEJPgw&*wh{|#$"w9yG09}{%hiog$%#{g04GW[ephq[h0y24u'

                # Public key
                N = 1615765684321463054078226051959887884233678317734892901740763321135213636796075462401950274602405095138589898087428337758445013281488966866073355710771864671726991918706558071231266976427184673800225254531695928541272546385146495736420261815693810544589811104967829354461491178200126099661909654163542661541699404839644035177445092988952614918424317082380174383819025585076206641993479326576180793544321194357018916215113009742654408597083724508169216182008449693917227497813165444372201517541788989925461711067825681947947471001390843774746442699739386923285801022685451221261010798837646928092277556198145662924691803032880040492762442561497760689933601781401617086600593482127465655390841361154025890679757514060456103104199255917164678161972735858939464790960448345988941481499050248673128656508055285037090026439683847266536283160142071643015434813473463469733112182328678706702116054036618277506997666534567846763938692335069955755244438415377933440029498378955355877502743215305768814857864433151287
                e = 3

                # 4bitずらして桁数調整
                M = ascii_to_int(plaintext) >> 4

                # Cypher
                C = (M ** e) % N

                print(f"Public key:\nN: {N}\ne: {e}\n\nCypher: {C}")
            </PyScript>

            復号化に使ったコード(答えです):
            <PyScript>
                def int_to_ascii(number):
                    hex_str = format(number, 'x')
                    
                    # 桁数が奇数の時、末尾に0を追加してパディング
                    if len(hex_str) % 2 != 0:
                        hex_str += '0'

                    # 2桁ずつ取得し、対応する文字を連結
                    ascii_str = ""
                    for i in range(0, len(hex_str), 2):
                        hex_pair = hex_str[i:i+2]
                        ascii_str += chr(int(hex_pair, 16))

                    return ascii_str
                
                # xのn乗根を二分探索する関数
                def find_invpow(x,n):
                    high = 1
                    while high ** n < x:
                        high *= 2
                    low = high // 2
                    # はさみうちにして探索
                    while low < high:
                        mid = (low + high) // 2
                        if low < mid and mid**n < x:
                            low = mid
                        elif high > mid and mid**n > x:
                            high = mid
                        else:
                            return mid
                    return mid + 1

                # public key
                N = 1615765684321463054078226051959887884233678317734892901740763321135213636796075462401950274602405095138589898087428337758445013281488966866073355710771864671726991918706558071231266976427184673800225254531695928541272546385146495736420261815693810544589811104967829354461491178200126099661909654163542661541699404839644035177445092988952614918424317082380174383819025585076206641993479326576180793544321194357018916215113009742654408597083724508169216182008449693917227497813165444372201517541788989925461711067825681947947471001390843774746442699739386923285801022685451221261010798837646928092277556198145662924691803032880040492762442561497760689933601781401617086600593482127465655390841361154025890679757514060456103104199255917164678161972735858939464790960448345988941481499050248673128656508055285037090026439683847266536283160142071643015434813473463469733112182328678706702116054036618277506997666534567846763938692335069955755244438415377933440029498378955355877502743215305768814857864433151287
                e = 3

                # Cypher
                C = 578069870094530462351261328666948515767897554502658120071907233783580395970131001941243908494353148130204366040277222739367513876346540027310848869067907765165251877924898614648219428930415010995973046665081910009013380837528607284315379785254404418467244979703868133847909433979017006731168734225226472367645374395273402314286134258138147136887254193694936530170957338675981316104803406001670063727851563932586592183827560674752708484474164406580399785727963997213948258953551891509104817116121684614878730582087330564032458592680194321481011243419888004168330070726256067503306799123195083232571209881050644598831117799547485331699050071488203534328420973557149080164022632732481301962959025169938525829991464491884077802994023313240938074001642044266215311806357886616275047721584982489250738342064045493889514303566889174037589093135573068541792703611394285169278753880997372788879561060315177893555376509936461335252720144979668267713455875089986569293335492620674584708415004907231317347924827333088

                # Nを法とした剰余から、元の数を求める
                for k in range(10):
                    M = find_invpow(C + k * N, e)
                    print(f"{k}: {int_to_ascii(M)}\n")
            </PyScript>

            今回は、公開鍵のうち、e(exponent)が極端に小さい例を取り上げた。
            一般にRSA暗号方式は安全だと考えられているが、このような誤用によって、その安全性が大きく損なわれてしまう場合がある。
            この問題のポイントは、いかに巨大な数のn乗根を求めるかということにある。
            通常の手法では、桁数が大きすぎてオーバフローを起こすか、正常に動作するものの計算に膨大な時間がかかってしまう。
            そこで、以前の問題でも扱った二分探索を使い、あらかじめ探索範囲を大幅に削減しておくという工夫が必要となる。
            あとは、デコードした文字列から、文字化けなく正常に変換されているものを探せば良い。<br>
            Congratulations!
        </Paragraph>

        <ProgressFooter :progress="completion" class="mt-16" />
        <div class="text-center my-5">
            <a href="#" class="p-2 rounded-md bg-green-700 hover:bg-green-600">ページ上部へ!</a>
        </div>
    </div>
</template>

<style scoped>
</style>