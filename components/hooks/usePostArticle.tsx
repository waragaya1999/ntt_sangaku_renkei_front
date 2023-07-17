import axios from "axios"
import { ChangeEvent, useState } from "react"
import { create } from "zustand"

const url = process.env.NEXT_PUBLIC_MOCK_URL || ""

export type articleDto = {
    userId: number
    imgPath: string
    content: string
    categories: number[]
}

export type categoryDto = {
    category_id: number
    category_name: string
    category_image_path: string
}

const resetArticle: articleDto = {
    userId: 0,
    imgPath: "",
    content: "",
    categories: [],
}

type postArticleState = {
    article: articleDto
    getImagePath: (event: ChangeEvent<HTMLInputElement>) => void
    clearImagePath: () => void
    imagePathOnChange: (event: ChangeEvent<HTMLInputElement>) => void
    bodyOnChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
    categories: categoryDto[]
    getCategories: () => void
    categoriesOnChange: (event: number[]) => void
    postArticle: (userId: number) => void
    resetArticle: () => void
}

const usePostArticle = create<postArticleState>((set, get) => ({
    article: resetArticle,

    getImagePath: async (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files)
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
                        imgPath: response.data.imgPath,
                    },
                }))
            } catch (error) {
                console.log(error)
            }
        }
    },

    clearImagePath: () => {
        set((state) => ({
            article: {
                ...state.article,
                imgPath: "",
            },
        }))
    },

    imagePathOnChange: (event: ChangeEvent<HTMLInputElement>) => {
        set((state) => ({
            article: {
                ...state.article,
                imgPath: event.target.value,
            },
        }))
    },

    bodyOnChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
        set((state) => ({
            article: {
                ...state.article,
                content: event.target.value,
            },
        }))
        console.log(get().article.content)
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

    categoriesOnChange: (event: number[]) => {
        set((state) => ({
            article: {
                ...state.article,
                categories: event,
            },
        }))
        console.log(get().article.categories)
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
            await axios
                .post(url + "/article", get().article, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    alert("投稿しました")
                    location.href = "/list"
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
