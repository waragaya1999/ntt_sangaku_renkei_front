import Header from "@/components/Header"
import "keen-slider/keen-slider.min.css"
import Footer from "@/components/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import { ResponseDto } from "@/types/ResponseDto"
import useAuth from "@/components/hooks/useAuth"

export default function Home() {
    const { user } = useAuth()

    const url = process.env.NEXT_PUBLIC_MOCK_URL + `/user/article`
    console.log("url: " + url)

    const userData = {
        userName: user.user_name,
        email: user.email,
        imgPath: user.user_thumbnail_path,
    }

    const [articles, setArticles] = useState<ResponseDto[]>([])
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
                    src={user.user_thumbnail_path}
                    className=" w-[45%] rounded-full m-auto"
                />
                <div className=" py-10">
                    <p>user name : {user.user_name}</p>
                    <p>email : {user.email}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {articles.map((article, index) => {
                        return (
                            <div key={index}>
                                <img
                                    src={article.image_path}
                                    alt=""
                                    className="w-full h-auto"
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </>
    )
}