<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import Title from '../components/Title.vue';
    import Header from '../components/Header.vue';
    import SubHeader from '../components/SubHeader.vue';
    import Paragraph from '../components/Paragraph.vue';
    import Code from '../components/Code.vue';
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
    <Title>第5講 Linux: 概要、Linuxコマンド</Title>

    <div class="container w-full sm:w-5/6 md:w-4/6 mx-auto mb-10 text-start">
        <Header>1.概要</Header>
        <Paragraph>
            <span class="text-yellow-400">Linux</span>は、Linuxカーネル上で動作するオープンソースのOSの総称である。
            Unixに類似した構造を有するため、同じくUnix系列のMacOSとは、直接の互換性はないものの、同様の操作性を得られる。

            <SubHeader>ディストリビューション</SubHeader>
            <Paragraph>
                上述したように、LinuxはLinuxカーネルを用いるOSの総称であって、それぞれのOSの実体はディストリビューション(<span class="text-yellow-400">distribution</span>, <span class="text-yellow-400">distro</span>)と呼ばれる。
                distroは、カーネルと周辺部のソフトウェア(デスクトップ環境など)からなるパッケージであって、インターネットからブートイメージを入手することができる。
                以下は、distroの一例である。

                <ul class="list-disc ml-10 my-5">
                    <li>Ubuntu (<a href="https://ubuntu.com/" class="underline text-blue-200">https://ubuntu.com/</a>)</li>
                    <li>Debian (<a href="https://www.debian.org/" class="underline text-blue-200">https://www.debian.org/</a>)</li>
                    <li>Fedora (<a href="https://fedoraproject.org/" class="underline text-blue-200">https://fedoraproject.org/</a>)</li>
                    <li>Arch Linux (<a href="https://archlinux.org/" class="underline text-blue-200">https://archlinux.org/</a>)</li>
                    <li>openSUSE (<a href="https://www.opensuse.org/" class="underline text-blue-200">https://www.opensuse.org/</a>)</li>
                </ul>

                distroにはそれぞれの強みがあるので、使途に応じた使い分けが必要だろう。
                例えば、多くのdistroでは初めから所定のGUI環境が提供されるが、Arch Linuxやサーバ用distroの場合、自分の好みのGUI環境を導入することができる。
            </Paragraph>

            <SubHeader>シェル</SubHeader>
            <Paragraph>
                Linuxでは、基本的な操作はターミナル(<span class="text-yellow-400">terminal</span>)から行うのが一般である。
                そして、ターミナルに入力された命令を解釈し、カーネルに伝達するのがシェル(<span class="text-yellow-400">shell</span>)の役割である。
                shellには以下のようなものがある。

                <ul class="list-disc ml-10 my-5">
                    <li>sh (bourne SHell)</li>
                    <li>bash (Bourne-Again SHell)</li>
                    <li>zsh (Z SHell)</li>
                    <li>fish (Friendly Interactive SHell)</li>
                    <li>ksh (Korn SHell)</li>
                </ul>

                現在使われているシェルを確認したい場合は、以下のコマンドを実行すること。

                <Code unique_id="0" language="bash" content="echo $SHELL">$ <span class="text-green-600">echo</span> $SHELL</Code>

                すると、実行されているシェルのパスが返されるので、シェルの種類を判断できる。
                以下の例では、bashが実行されていることがわかる。

                <Code unique_id="1" language="bash" content="">$ <span class="text-green-600">echo</span> $SHELL<br>/bin/bash</Code>
            </Paragraph>

            <SubHeader>アクセス権</SubHeader>
            <Paragraph>
                Linuxでは、それぞれのファイル(<span class="text-yellow-400">file</span>)あるいはディレクトリ(<span class="text-yellow-400">directory</span>)に固有のアクセス権(<span class="text-yellow-400">permission</span>)が設定される。
                アクセス権は、そのファイルまたはディレクトリに対して、どのユーザがどのような操作を行えるかを規定する。現在のディレクトリに存在する全てのコンテンツの権限を確認したい場合、以下のコマンドを実行すると良い。

                <Code unique_id="17" language="bash" content="ls -l">$ <span class="text-green-600">ls</span> -l</Code>

                すると、このような結果が返ってくるだろう。

                <Code unique_id="2" language="bash" content="">$ <span class="text-green-600">ls</span> -l<br>total 12<br>-rw-r--r-- 1 user user 1234 Jun  7 10:00 file1.txt<br>-rw-r--r-- 1 user user 5678 Jun  7 10:01 file2.txt<br>drwxr-xr-x 2 user user 4096 Jun  7 10:02 dir1</Code>

                ここで注目して欲しいのは、各行の初めのアルファベット列である。
                左端の一文字は、ファイルの種類を表す。
                通常のファイルの場合は"-"、ディレクトリの場合は"d"、リンクの場合は"l"などと表記される。
                また、その右のアルファベットは、所有ユーザー、所有グループ、あるいはその他のユーザーが、そのファイルに対してもつread権限(r)、write権限(w)、execute権限(x)をそれぞれ表している。
                .pyなどの実行ファイルは、実行時にexecute権限が必要であることを覚えておこう。
            </Paragraph>
        </Paragraph>

        <Header>2.Linuxコマンド</Header>
        <Paragraph>
            ここでは、使用頻度が特に高いLinuxコマンドを紹介する。
            Linuxを操作する上で必要不可欠と言っても過言でないコマンドばかりを取り扱っているため、ぜひ覚えてほしい。
            また、コマンドを覚える際はただ暗記するのではなく、実際にターミナルに入力して、その機能と合わせて覚えるように心がけよう。

            <div class="flex-col mx-auto mt-10 mb-12 border rounded-lg border-green-600 p-3.5">
                <span class="text-2xl ml-2">主なLinuxコマンド</span><br>
                    <ul class="ml-5 mt-3">
                        <li><a href="#1" class="hover:underline hover:text-2xl hover:text-green-600 decoration-green-600">ls</a></li>
                        <li><a href="#2" class="hover:underline hover:text-2xl hover:text-green-600 decoration-green-600">pwd</a></li>
                        <li><a href="#3" class="hover:underline hover:text-2xl hover:text-green-600 decoration-green-600">cd</a></li>
                        <li><a href="#4" class="hover:underline hover:text-2xl hover:text-green-600 decoration-green-600">mv</a></li>
                        <li><a href="#5" class="hover:underline hover:text-2xl hover:text-green-600 decoration-green-600">cp</a></li>
                        <li><a href="#6" class="hover:underline hover:text-2xl hover:text-green-600 decoration-green-600">touch</a></li>
                        <li><a href="#7" class="hover:underline hover:text-2xl hover:text-green-600 decoration-green-600">mkdir</a></li>
                        <li><a href="#8" class="hover:underline hover:text-2xl hover:text-green-600 decoration-green-600">cat</a></li>
                        <li><a href="#9" class="hover:underline hover:text-2xl hover:text-green-600 decoration-green-600">echo</a></li>
                        <li><a href="#10" class="hover:underline hover:text-2xl hover:text-green-600 decoration-green-600">rm</a></li>
                    </ul>
            </div>

            <SubHeader id="1">ls</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">ls</span>は、listの略であり、ディレクトリの中身を一覧するときに用いる。

                <Code unique_id="3" language="bash" content="ls">$ <span class="text-green-600">ls</span><br>file1.txt file2.txt dir1</Code>

                また、<span class="text-yellow-400">-a</span>(all)オプションを付せば、隠しファイルを含めた全ファイル・ディレクトリを一覧できる。

                <Code unique_id="4" language="bash" content="ls -a">$ <span class="text-green-600">ls</span> -a<br>. .. .hidden.txt file1.txt file2.txt dir1</Code>

                上の例でも見たように、<span class="text-yellow-400">-l</span>オプションで権限を確認することもできる。
            </Paragraph>

            <SubHeader id="2">pwd</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">pwd</span>は、print working directoryの略であり、現在作業中のディレクトリの絶対パスを返す。

                <Code unique_id="5" language="bash" content="pwd">$ <span class="text-green-600">pwd</span><br>/home/test</Code>
            </Paragraph>

            <SubHeader id="3">cd</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">cd</span>は、change directoryの略であり、作業ディレクトリを指定したパスへと変更する。

                <Code unique_id="6" language="bash" content="cd dir1">$ <span class="text-green-600">pwd</span><br>/home/test<br>$ <span class="text-green-600">cd</span> dir1<br>$ <span class="text-green-600">pwd</span><br>/home/test/dir1</Code>

                存在しないパスを指定した場合は、"cd: The directory 'hogehoge' does not exist"のように表示され、標準エラー出力となる。
            </Paragraph>

            <SubHeader id="4">mv</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">mv</span>は、moveの略であり、指定したファイル・ディレクトリを任意のパスへ移動させる。

                <Code unique_id="7" language="bash" content="mv file1.txt dir1">$ <span class="text-green-600">ls</span><br>file1.txt file2.txt dir1<br>$ <span class="text-green-600">mv</span> file1.txt dir1<br>$ <span class="text-green-600">ls</span> dir1<br>file1.txt</Code>
            </Paragraph>

            <SubHeader id="5">cp</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">cp</span>は、copyの略であり、指定したファイル・ディレクトリを任意のパスへコピーする。
                書き方は、mvコマンドと非常に似ている。

                <Code unique_id="8" language="bash" content="cp file1.txt dir1">$ <span class="text-green-600">ls</span><br>file1.txt file2.txt dir1<br>$ <span class="text-green-600">cp</span> file1.txt dir1<br>$ <span class="text-green-600">ls</span> dir1<br>file1.txt</Code>

                ディレクトリをその中身ごとコピーするときは、<span class="text-yellow-400">-r</span>(recursive)オプションを付して、再帰的にコピーする必要がある。
            </Paragraph>

            <SubHeader id="6">touch</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">touch</span>は、空のファイルを作成するコマンドである。

                <Code unique_id="9" language="bash" content="touch file3.txt">$ <span class="text-green-600">ls</span><br>file1.txt file2.txt dir1<br>$ <span class="text-green-600">touch</span> file3.txt<br>$ <span class="text-green-600">ls</span><br>file1.txt file2.txt file3.txt dir1<br></Code>

                Linuxでは、拡張子(extension)によってファイルの種類を判別しない。
                したがって、自由に拡張子を付すこともできるが、メンテナンス性の観点から、なるべく慣習に従った拡張子をつけるべきである。
            </Paragraph>

            <SubHeader id="7">mkdir</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">mkdir</span>は、make directoryの略で、空のディレクトリを作成するコマンドである。

                <Code unique_id="10" language="bash" content="mkdir dir2">$ <span class="text-green-600">ls</span><br>file1.txt file2.txt dir1<br>$ <span class="text-green-600">mkdir</span> dir2<br>$ <span class="text-green-600">ls</span><br>file1.txt file2.txt dir1 dir2<br></Code>
            </Paragraph>

            <SubHeader id="8">cat</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">cat</span>は、concatenateの略で、ファイルの中身を表示したり、2つのファイルの中身を結合したりする。
                主な使途は、ファイルの中身の確認だろう。

                <Code unique_id="11" language="bash" content="cat file1.txt">$ <span class="text-green-600">cat</span> file1.txt<br>This is an example.</Code>
            </Paragraph>

            <SubHeader id="9">echo</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">echo</span>は、指定した文字列を表示する。
                Pythonにおけるprint()関数と似たような機能である。

                <Code unique_id="12" language="bash" content="echo hello">$ <span class="text-green-600">echo</span> hello<br>hello</Code>

                さらに応用的な使い方として、リダイレクトと組み合わせることにより、ファイルを上書きしたり追記したりすることができる。

                <Code unique_id="13" language="bash" content="echo hello > file1.txt">$ <span class="text-green-600">echo</span> hello > file1.txt<br>$ <span class="text-green-600">cat</span> file1.txt<br>hello</Code>
                <Code unique_id="14" language="bash" content="echo hello >> file1.txt">$ <span class="text-green-600">echo</span> hello >> file1.txt<br>$ <span class="text-green-600">cat</span> file1.txt<br>This is an example.<br>hello</Code>

                ">"が上書き、">>"が追記である。
            </Paragraph>

            <SubHeader id="10">rm</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">rm</span>は、removeの略で、指定したファイル・ディレクトリを<span class="text-red-400">完全に消去する</span>。
                したがって、不用意にこのコマンドを使うと、誤って意図せぬファイルやディレクトリを消去し、取り返しのつかない事態に陥る危険性がある。
                使用の際は、細心の注意を払い、ダブルチェックを怠らないようにすること。

                <Code unique_id="15" language="bash" content="rm file2.txt">$ <span class="text-green-600">ls</span><br>file1.txt file2.txt dir1<br>$ <span class="text-green-600">rm</span> file2.txt<br>$ <span class="text-green-600">ls</span><br>file1.txt dir1<br></Code>

                ディレクトリを中身ごと消去したい場合は、<span class="text-yellow-400">-r</span>(recursive)オプションを付すこと。また、インターネット上には<span class="text-yellow-400">-f</span>(force)オプションを使っている例が載っているが、なるべく使わないのが無難である。
            </Paragraph>

            <SubHeader>おまけ</SubHeader>
            <Paragraph>
                lsコマンドはディレクトリ内の要素の一覧を返すが、しばしば、表示される要素数が多すぎて目的の要素を探すのが困難な時がある。
                そのような場合は、lsコマンドの結果を<span class="text-yellow-400">grep</span>コマンドに渡せば良い。
                grepはglobal regular expression printの略で、指定した正規表現を含む文字列を表示する。
                例を見て確認しよう。

                <Code unique_id="16" language="bash" content="ls | grep 5">$ <span class="text-green-600">ls</span><br>file1.txt file2.txt file3.txt file4.txt file5.txt<br> dir1&nbsp;&nbsp;dir2&nbsp;&nbsp;dir3&nbsp;&nbsp;dir4&nbsp;&nbsp;dir5<br>$ <span class="text-green-600">ls</span> | <span class="text-green-600">grep</span> 5<br>file5.txt dir5</Code>

                このように、与えられた文字列を含む要素だけを抽出することができる。
                ここで用いた"|"はパイプ(pipe)と呼ばれ、前のコマンドの出力を次のコマンドの入力にリダイレクトするための記号である。
            </Paragraph>
        </Paragraph>

        <ProgressFooter :progress="completion" class="mt-16" />
        <div class="text-center my-5">
            <a href="#" class="p-2 rounded-md bg-green-700 hover:bg-green-600">ページ上部へ!</a>
        </div>
    </div>
</template>

<style scoped>
</style>