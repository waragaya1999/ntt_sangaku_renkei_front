import usePostArticle from "@/components/hooks/usePostArticle"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import useAuth from "@/components/hooks/useAuth"
import axios from "axios"
import PostArticle from "@/components/PostArticle"
import Footer from "@/components/Footer"
import Header from "@/components/Header"

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
            <Header location={"投稿"} postArticle={postArticle} />
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
                </div>
            </main>
            <Footer />
        </>
    )
}
