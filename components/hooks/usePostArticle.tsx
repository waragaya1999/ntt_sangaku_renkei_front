import axios from "axios"
import { ChangeEvent, useState } from "react"
import { create } from "zustand"

const url = process.env.NEXT_PUBLIC_MOCK_URL || ""

type articleDto = {
    userId: number
    imagePath: string
    body: string
    categories: string
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
    categoriesOnChange: (event: ChangeEvent<HTMLInputElement>) => void
    postArticle: (userId: number) => void
    resetArticle: () => void
}

const usePostArticle = create<postArticleState>((set, get) => ({
    article: resetArticle,

    getImagePath: async (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event)

        const image = event.target?.files?.[0]
        console.log(image)

        try {
            //Todo URL確認
            console.log(image)

            const response = await axios.post(url + "/fileup", image, {
                headers: {
                    accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            })

            // Todo ここを確認
            set((state) => ({
                article: {
                    ...state.article,
                    imagePath: response.data.userId,
                },
            }))
        } catch (error) {
            console.log(error)
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
