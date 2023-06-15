import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { NextPage } from "next";

const Login: NextPage = () => {
  // sessionには、以下のような値が入っています。
  // {
  //     "user":{
  //        "name":"John",
  //        "email":"john@examle.com",
  //        "image":"https://lh3.googleusercontent.com/a/AGNmyxZF7jQN_YTYVyxIx5kfdo3kalfRktVD17GrZ9n=s96-c"
  //     },
  //     "expires":"2023-04-01T00:29:51.016Z"
  // }
  const { data: session } = useSession();

  return (
    <>
      {
        // セッションがある場合、ログアウトを表示
        session && (
          <div>
            <h1>ログインしています</h1>
            <p>{"{"}</p>
            <p className="indent-4">user: {"{"}</p>
            <p className="indent-8">user.name: {session.user?.name}</p>
            <p className="indent-8">user.email: {session.user?.email}</p>
            <p className="indent-8">user.image: {session.user?.image}</p>
            <img
              src={session.user?.image || ""}
              alt="sessionUserImage"
              className="ml-8"
            />
            <p className="indent-4">{"}"}</p>
            <p className="indent-4">expires: {session.expires}</p>
            <p>{"}"}</p>
            <button onClick={() => signOut()}>ログアウト</button>

            <p>
              理由はよくわかんないけど、pagesの中にapiを入れとく必要があるみたい。
            </p>
            <p>
              _app.tsxは全てのページコンポーネントの初期化？初期値？的なことに使われるっぽい。ここを適当な名前に変えると動かなくなる。
            </p>
            <p>
              あと yarn dev
              してからtsconfig.jsonが赤くなるようになっちゃったっていう報告
            </p>
            <p>あとレイアウトのいい感じの付け方わからんから教えてクレメンス</p>
          </div>
        )
      }
      {
        // セッションがない場合、ログインを表示
        // ログインボタンを押すと、ログインページに遷移する
        !session && (
          <div>
            <p>ログインしていません</p>
            <button onClick={() => signIn()}>ログイン</button>
          </div>
        )
      }
    </>
  );
};

export default Login;
