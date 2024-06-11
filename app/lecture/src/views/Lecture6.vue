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
    <Title>第6講 Git: 概要、Gitコマンド</Title>

    <div class="container w-full sm:w-5/6 md:w-4/6 mx-auto mb-10 text-start">
        <Header>1.概要</Header>
        <Paragraph>
            <span class="text-yellow-400">Git</span>(Global Information Tracker)は、平たく言えば、作成しているプロジェクトのバージョンを管理・共有するためのソフトウェアである。Gitで管理されているプロジェクト一つ一つをレポジトリ(<span class="text-yellow-400">repository</span>)と呼び、レポジトリは<a href="https://github.com/" class="underline text-blue-200">GitHub</a>というウェブサイトにアップロードすることで共有可能となる。

            <SubHeader>コミット</SubHeader>
            <Paragraph>
                Gitによるバージョン管理を行うためには、管理を行いたいディレクトリ内でGitの初期化を行う必要がある。
                これによって、以降にこのディレクトリに加えられた全ての変更がGitによるトラッキングの対象となり、これを保存するためには、都度、コミット(<span class="text-yellow-400">commit</span>)という作業が必要になる。
                コミットにより新しいバージョンが作られ、必要に応じてバージョンを遡ったりすることが可能になる。
            </Paragraph>

            <SubHeader>ブランチ</SubHeader>
            <Paragraph>
                Gitのバージョン管理において特徴的な点は、レポジトリを高速に複製して新たなバージョンを作成可能にするブランチ(<span class="text-yellow-400">branch</span>)機能であろう。
                これにより、プロジェクトに何らかの新機能を追加する場合、メインストリームのバージョンとは全く独立したバージョンで開発を行うことができ、元々のプロジェクトに影響を及ぼさないほか、開発の役割分担が容易になる。
            </Paragraph>

            <SubHeader>マージ</SubHeader>
            <Paragraph>
                Gitにおいて、異なるバージョンを結合して新しいバージョンを作ることをマージ(<span class="text-yellow-400">merge</span>)という。
                例えば、メインストリームとは別のブランチで新機能を開発し、それを本番環境にデプロイしたい場合、このブランチをメインストリームにマージすれば良い。
                ただし、マージする2つのブランチに矛盾点(同じ行に対して異なる変更が加えられている、など)が存在する場合、コンフリクト(<span class="text-yellow-400">conflict</span>)となってマージが失敗することがある。
                この場合は、VSCodeなどでマージエディタを開き、どちらの変更をマージするかを選択するのが簡便である。
            </Paragraph>
        </Paragraph>

        <Header>2.Gitコマンド</Header>
        <Paragraph>
            ここでは、主なGitコマンドを紹介する。
            全てのGitコマンドは、"git"が第1引数となるため、他のコマンドと混同されることは少ないだろう。
            チームで同一レポジトリの開発を行う場合は、後述するpushコマンドなどが破壊的な影響をもたらす場合があるので、実行する際にはくれぐれも注意し、自分がどのような操作を行おうとしているのかを常に意識すること。

            <SubHeader>git init</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">init</span>は、initializeの略であり、バージョン管理をしたいディレクトリ内で最初だけ実行する。

                <Code unique_id="0" language="bash" content="git init">$ <span class="text-green-600">git</span> init</Code>
            </Paragraph>

            <SubHeader>git add</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">add</span>は、コミットしたい内容を選択(ステージング)したいときに用いる。
                以下の例では、file1.txtだけをコミット対象に選択している。

                <Code unique_id="1" language="bash" content="git add file1.txt">$ <span class="text-green-600">ls</span> -a<br>. .. .git file1.txt file2.txt dir1<br>$ <span class="text-green-600">git</span> add file1.txt</Code>

                ちなみに、全てのファイル・ディレクトリを選択する方法として、
                <Code unique_id="2" language="bash" content="git add .">$ <span class="text-green-600">git</span> add .</Code>
                が紹介されることがあるが、これは、文字通りプロジェクト下の全てのファイル・ディレクトリを追加するため、どのファイルにどのような変更が加えられたかを追跡しづらくなる。
                もし新しく作成されたファイル・ディレクトリのみを全て追加したい場合には、
                <Code unique_id="2" language="bash" content="git add --all">$ <span class="text-green-600">git</span> add --all</Code>
                のように、--allオプションをつける方が良い。
            </Paragraph>

            <SubHeader>git commit</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">commit</span>は、ローカル環境に変更を保存するときに用いる。
                コミットの粒度(granularity)は、チームの開発方針などにもよるが、ほとんどの場合、どれだけ粗くても機能単位で行われるべきである。
                これより粗い粒度では、コミットをやり直す場合に失われる進捗が大きすぎて、開発に無駄な時間が生じてしまう。

                <Code unique_id="3" language="bash" content="git commit">$ <span class="text-green-600">git</span> commit</Code>

                ただし、実際にコミットをするときには、以下のように<span class="text-yellow-400">-m</span>(message)オプションを付し、変更内容を明記することが強く求められる。

                <Code unique_id="4" language="bash" content="git commit -m 'add: new file'">$ <span class="text-green-600">git</span> commit -m 'add: new file'</Code>

                feat, add, update, removeなど、その変更を簡潔に表す単語を先頭に含めることが多い。
            </Paragraph>

            <SubHeader>git branch</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">branch</span>は、ローカル上のブランチを一覧する。

                <Code unique_id="5" language="bash" content="git branch">$ <span class="text-green-600">git</span> branch<br>* main<br>test1<br>test2</Code>

                現在いるブランチは、アスタリスク(*)で明示される。
                また、<span class="text-yellow-400">-a</span>(all)オプションを付せば、リモート上のブランチを含めて表示できる。
            </Paragraph>

            <SubHeader>git checkout</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">checkout</span>は、作業スペースをローカル上の別のブランチに変更したいときに用いる。

                <Code unique_id="6" language="bash" content="git checkout test1">$ <span class="text-green-600">git</span> branch<br>* main<br>test1<br>test2<br>$ <span class="text-green-600">git</span> checkout test1<br>Switched to branch 'test1'<br>$ <span class="text-green-600">git</span> branch<br>* test1<br>main<br>test2</Code>

                また、<span class="text-yellow-400">-b</span>(branch)オプションを付すことで、新しくブランチを作成することも可能である。

                <Code unique_id="7" language="bash" content="git checkout -b test3">$ <span class="text-green-600">git</span> checkout -b test3<br>Switched to branch 'test3'</Code>
            </Paragraph>

            <SubHeader>git merge</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">merge</span>は、指定されたローカル上の2つのブランチを結合する。
                このコマンドは、現在作業中のブランチに指定したブランチをマージするので、先にマージ先のブランチに移動しておくことが必要である。
                以下は、test1ブランチにtest2ブランチをマージする例である。

                <Code unique_id="8" language="bash" content="git merge test2">$ <span class="text-green-600">git</span> checkout test1<br>Switched to branch 'test1'<br>$ <span class="text-green-600">git</span> merge test2</Code>
            </Paragraph>

            <SubHeader>git clone</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">clone</span>は、リモート上のブランチをローカルにダウンロードするコマンドである。
                GitHubからダウンロード用のリンクをコピーすることができる。
                また、ダウンロードの際に用いる通信方式をHTTPSかSSHから選択することができる。
                ただし、GitHub公式はHTTPS接続を推奨しているようである。

                <Code unique_id="9" language="bash" content="git clone https://github.com/Rione/home_ros2_setup.git">$ <span class="text-green-600">git</span> clone https://github.com/Rione/home_ros2_setup.git<br>$ <span class="text-green-600">ls</span><br>home_ros2_setup</Code>

                ダウンロードされたディレクトリ内では、すでにGitを使用するための初期化が完了しているので、git initする必要はない。
            </Paragraph>

            <SubHeader>git fetch</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">fetch</span>は、ローカル上のリモート追跡ブランチを、リモートのブランチと同期させるために用いる。
                ただし、ローカル上のブランチに対してマージは行わない。
                誤解を恐れずに言えば、ローカルのレポジトリをアップデートする機能である。
                したがって、頻繁に行うのが良い慣習である。

                <Code unique_id="10" language="bash" content="git fetch">$ <span class="text-green-600">git</span> fetch</Code>

                変更をマージしたい場合には、前述のgit mergeを使えば良い。
            </Paragraph>

            <SubHeader>git push</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">push</span>は、ローカル上にあるブランチを、リモートにあるブランチにマージするためのコマンドである。
                リモートに直接マージをするので、場合によっては破壊的な変化になる可能性がある。
                必ず、マージ先のリモートブランチをよく確認すること。
                特に、リモートのmainあるいはmasterブランチに直接プッシュしないように気をつけること。

                <Code unique_id="11" language="bash" content="git push">$ <span class="text-green-600">git</span> push</Code>

                間違いを防ぐ意味で、以下のように、あえてマージ元とマージ先のブランチ名を明記することを推奨する。

                <Code unique_id="12" language="bash" content="git push origin test1:test1">$ <span class="text-green-600">git</span> push origin test1:test1</Code>

                &lt;ローカルブランチ&gt; : &lt;リモートブランチ&gt;の順に書く。
                また、originとは、リモートレポジトリのURLのエイリアスである。
            </Paragraph>

            <SubHeader>git pull</SubHeader>
            <Paragraph>
                <span class="text-yellow-400">pull</span>は、git fetchとgit mergeを組み合わせたコマンドである。
                したがって、これら2つのコマンドを個別に実行するのと結果は全く同じである。

                <Code unique_id="13" language="bash" content="git pull">$ <span class="text-green-600">git</span> pull</Code>
                <Code unique_id="14" language="bash" content="git fetch && git merge">$ <span class="text-green-600">git</span> fetch && <span class="text-green-600">git</span> merge</Code>

                上の2つは、どちらも同じ結果になる。
                ただし、チームの開発方針によって、git pullが禁止されていることもある。
                これは、リモートでエラーが生じているときに、それを把握しないままローカルにマージしてしまうことを防ぐためである。
                しかし、エラーが発生した状態でリモートにプッシュされる事態は通常は起こり得ないため、git pullを使っても良いとの見解もある。
            </Paragraph>
        </Paragraph>

        <Header>3.おわりに</Header>
        <Paragraph>
            全6回に渡り、ご清聴いただきありがとうございました。
            今回の講座を受けて、プログラミングは何だか難しそうだと感じた方もいらっしゃるかもしれませんね。
            ご安心ください。今の時代は、ChatGPTたる文明の利器があるのです。
            迷ったら、何でもかんでもAIに尋ねれば良いのです。
            彼らが、十中八九解決してくれるでしょう。
            <br><br>
            ともかく、今後も頑張って学習を続けてくださいね。
            それではみなさん、
            <div class="text-center rainbow-text">Happy Coding!</div>
        </Paragraph>

        <ProgressFooter :progress="completion" class="mt-16" />
        <div class="text-center my-5">
            <a href="#" class="p-2 rounded-md bg-green-700 hover:bg-green-600">ページ上部へ!</a>
        </div>
    </div>
</template>

<style scoped>
    @keyframes rainbow-move {
        0% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .rainbow-text {
        font-size: 4em;
        font-weight: bold;
        background: white repeating-linear-gradient(90deg, #14ffe9 0%, #ffc800 16.66666%, #ff00e0 33.33333%, #14ffe9 50.0%);
        background-size: 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: rainbow-move 2s linear infinite;
    }
</style>