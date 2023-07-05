import axios from "axios"
import { log } from "console"
import { headers } from "next/dist/client/components/headers"
import { ChangeEvent, useState } from "react"
import { create } from "zustand"

const url = process.env.NEXT_PUBLIC_MOCK_URL || ""

type articleDto = {
    userId: number
    imagePath: string
    body: string
    categories: string
}

type categoryDto = {
    category_id: number
    category_name: string
    category_image_path: string
}

const resetArticle: articleDto = {
    userId: 0,
    imagePath: "",
    body: "",
    categories: "",
}

type postArticleState = {
    article: articleDto
    getImagePath: (event: ChangeEvent<HTMLInputElement>) => void
    imagePathOnChange: (event: ChangeEvent<HTMLInputElement>) => void
    bodyOnChange: (event: ChangeEvent<HTMLInputElement>) => void
    categories: categoryDto[]
    getCategories: () => void
    categoriesOnChange: (event: ChangeEvent<HTMLInputElement>) => void
    postArticle: (userId: number) => void
    resetArticle: () => void
}

const usePostArticle = create<postArticleState>((set, get) => ({
    article: resetArticle,

    getImagePath: async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            try {
                //Todo URL確認
                const formData = new FormData()
                formData.append("file", event.target.files[0])
                const response = await axios.post(url + "/fileup", formData, {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "multipart/form-data",
                    },
                })

                // Todo ここを確認
                set((state) => ({
                    article: {
                        ...state.article,
                        imagePath: response.data.imgPath,
                    },
                }))
            } catch (error) {
                console.log(error)
            }
        }
    },

    imagePathOnChange: (event: ChangeEvent<HTMLInputElement>) => {
        set((state) => ({
            article: {
                ...state.article,
                imagePath: event.target.value,
            },
        }))
    },

    bodyOnChange: (event: ChangeEvent<HTMLInputElement>) => {
        set((state) => ({
            article: {
                ...state.article,
                body: event.target.value,
            },
        }))
    },

    // Todo 大変そうだからとりあえずStringでやった
    // ポコポコポコスタイル
    categories: [],
    getCategories: async () => {
        console.log("getCategories run")

        try {
            const response = await axios.get(url + "/categories", {
                headers: {
                    accept: "application/json",
                },
            })
            set({
                categories: response.data,
            })
            console.log("response: " + response)
        } catch (e) {
            console.log("getCategory error")
            console.log(e)
        }
        console.log(get().categories)
    },
    // getCategories: () => {
    //     axios
    //         .get(url + "/categories", {
    //             headers: { accept: "application/json" },
    //         })
    //         .then((res) => {
    //             console.log(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // },

    categoriesOnChange: (event: ChangeEvent<HTMLInputElement>) => {
        set((state) => ({
            article: {
                ...state.article,
                categories: event.target.value,
            },
        }))
    },

    postArticle: async (userId: number) => {
        set((state) => ({
            article: {
                ...state.article,
                userId: userId,
            },
        }))
        try {
            //Todo URL確認
            await axios.post(url + "/post", get().article, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
        } catch (error) {
            console.log(error)
        }
    },

    resetArticle: () => {
        set({
            article: resetArticle,
        })
    },
}))

export default usePostArticle
