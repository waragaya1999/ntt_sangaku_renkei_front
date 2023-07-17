import usePostArticle from "@/components/hooks/usePostArticle"
import Header from "@/components/Header"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import useAuth from "@/components/hooks/useAuth"
import axios from "axios"
import PostArticle from "@/components/PostArticle"
import Footer from "@/components/Footer"

export default function Post() {
    // グーグルログイン後、ユーザIDを取得
    const { data: session } = useSession()
    const { login, user } = useAuth()

    const {
        article,
        getImagePath,
        clearImagePath,
        imagePathOnChange,
        bodyOnChange,
        categories,
        getCategories,
        categoriesOnChange,
        postArticle,
        resetArticle,
    } = usePostArticle()

    useEffect(() => {
        login(session?.user)
        getCategories()
    }, [session])

    return (
        <>
            <Header location={"投稿"} />
            <main className={"h-[calc(100%-4rem)] pt-16"}>
                <div
                    className={"w-[90%] m-auto"}
                    style={{ height: "calc((100vh - 8rem) * 0.96)" }}
                >
                    <PostArticle
                        user={user}
                        article={article}
                        categories={categories}
                        getImagePath={getImagePath}
                        clearImagePath={clearImagePath}
                        bodyOnChange={bodyOnChange}
                        categoriesOnChange={categoriesOnChange}
                    />
                    <div className="w-full max-w-xs">
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => postArticle(user.user_id)}
                                >
                                    投稿
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => resetArticle()}
                                >
                                    リセット
                                </button>
                            </div>
                        </form>
                        <p className="text-center text-gray-500 text-xs">
                            &copy;2020 Acme Corp. All rights reserved.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
