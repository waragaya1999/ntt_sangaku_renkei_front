import usePostArticle from "@/components/hooks/usePostArticle"
import Header from "@/components/Header"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import useAuth from "@/components/hooks/useAuth"
import axios from "axios"

export default function Test() {
    // グーグルログイン後、ユーザIDを取得
    const { data: session } = useSession()
    const { login, user } = useAuth()

    const {
        article,
        getImagePath,
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
            <main>
                <div className="w-full max-w-xs">
                    <form>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => getImagePath(e)}
                        />
                    </form>
                    <p>imagePath: {article.imagePath}</p>
                    <img src={article.imagePath} />

                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <p>user.userId: {user.userId}</p>
                            <p>article.imagePath: {article.imagePath}</p>
                            <p>article.body: {article.body}</p>
                            <p>article.categories: {article.categories}</p>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                imagePath
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={article.imagePath}
                                onChange={(event) => imagePathOnChange(event)}
                            />
                            {article.imagePath == "" ? (
                                <div className="mb-6">
                                    <p className="text-red-500 text-xs italic">
                                        Please choose a password.
                                    </p>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                body
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={article.body}
                                onChange={(event) => bodyOnChange(event)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                category
                            </label>

                            {categories.map((category) => (
                                <p>{category.category_name}</p>
                            ))}

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={article.categories}
                                onChange={(event) => categoriesOnChange(event)}
                            />
                        </div>

                        <div className="mb-6">
                            <p className="text-red-500 text-xs italic">
                                Please choose a password.
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={() => postArticle(user.userId)}
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
            </main>
        </>
    )
}
