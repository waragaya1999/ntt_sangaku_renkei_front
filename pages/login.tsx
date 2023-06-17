import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { NextPage } from "next";
import useAuth from "@/components/hooks/useAuth";

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

  // グーグルログイン後、ユーザIDを取得
  const { login, logout, user } = useAuth();

  useEffect(() => {
    login(session?.user);
  }, [session]);

  const logoutHandle = () => {
    signOut();
    logout();
  };

  return (
    <>
      {
        // セッションがある場合、ログアウトを表示
        session && (
          <div>
            <h1>ログインしています</h1>
            <p>userId = {user.userId}</p>
            <p>{"{"}</p>
            <p className="indent-4">user: {"{"}</p>
            <p className="indent-8">user.name: {user.name}</p>
            <p className="indent-8">user.email: {user.email}</p>
            <p className="indent-8">user.image: {user.image}</p>
            <img
              src={session.user?.image || ""}
              alt="sessionUserImage"
              className="ml-8"
            />
            <p className="indent-4">{"}"}</p>
            <p className="indent-4">expires: {session.expires}</p>
            <p>{"}"}</p>
            <button onClick={() => logoutHandle()}>ログアウト</button>
          </div>
        )
      }
      {
        // セッションがない場合、ログインを表示
        // ログインボタンを押すと、ログインページに遷移する
        !session && (
          <div>
            <p>ログインしていません</p>
            <p>userId = {user.userId}</p>
            <button onClick={() => signIn()}>ログイン</button>
          </div>
        )
      }
    </>
  );
};

export default Login;
