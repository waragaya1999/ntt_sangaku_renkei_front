import Header from "@/components/Header"
import UpperPost from "@/components/UpperPost"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Footer from "@/components/Footer"
import CatList from "@/components/CatList"
import { useEffect, useLayoutEffect, useState } from "react"
import axios from "axios"
import { ResponseDto } from "@/types/ResponseDto"
import { CategoriesResponseDto } from "@/types/CategoriesResponseDto"
import useAuth from "@/components/hooks/useAuth"

export default function Home() {
    const { user } = useAuth()

    const url = process.env.NEXT_PUBLIC_MOCK_URL + `/user/article`
    console.log("url: " + url)

    const userData = {
        userName: user.name,
        email: user.email,
        imgPath: user.image,
    }

    const [articles, setArticles] = useState(null)
    const getArticle = async () => {
        try {
            const response = await axios.post(url, userData, {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            setArticles(response.data)
        } catch (error) {}
    }

    useEffect(() => {
        getArticle()
    }, [])

    console.log("articles: " + articles)

    return (
        <>
            <Header location={"マイページ"} />
            <div className="p-20 w-full ">
                <img
                    src={user.image}
                    className=" w-[45%] rounded-full m-auto"
                />
                <div className=" pt-10">
                    <p>user name : {user.name}</p>
                    <p>email : {user.email}</p>
                </div>

                <div className="pt-12">
                    <h2>投稿一覧</h2>
                </div>
            </div>
            <Footer />
        </>
    )
}
