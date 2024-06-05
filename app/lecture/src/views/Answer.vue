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
            まだできてないよ。
        </Paragraph>

        <ProgressFooter :progress="completion" class="mt-16" />
        <div class="text-center my-5">
            <a href="#" class="p-2 rounded-md bg-green-700 hover:bg-green-600">ページ上部へ!</a>
        </div>
    </div>
</template>

<style scoped>
</style>