import "../styles/globals.css";
import Header from "@/components/header";
import UpperPost from "@/components/upperPost";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Test() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const { data: session } = useSession();
  useEffect(() => {
    setImageUrl(session?.user?.image || "");
    console.log(session?.user?.image);
  }, [session]);

  return (
    <>
      <Header />
      <main>
        <div className={"w-[90%] m-auto mt-4"}>
          <UpperPost bgImage={imageUrl} />
          <div></div>
        </div>
      </main>
      <>
        {
          // セッションがある場合、ログアウトを表示
          session && (
            <div>
              <h1>ようこそ, {session.user && session.user.email}</h1>
              <button onClick={() => signOut()}>ログアウト</button>
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
    </>
  );
}
