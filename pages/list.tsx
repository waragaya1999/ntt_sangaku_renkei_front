import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ListComponent from "@/components/List"
import { useLayoutEffect, useState } from "react"
import { ResponseDto } from "@/types/ResponseDto"
import axios from "axios"

export default function List() {
    const [doc, setDoc] = useState<ResponseDto[]>([])
    const getArticles = () => {
        axios
            .get("http://localhost:8003/articles?page=1", {
                headers: {
                    accept: "application/json",
                },
            })
            .then((res) => {
                setDoc(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

        console.log("getArticles run")
    }

    useLayoutEffect(() => {
        getArticles()
    }, [])
    return (
        <>
            <Header location={"投稿"} />
            <main className={"py-16 overflow-scroll hidden-scrollbar bg-white"}>
                {doc.map((doc, index) => {
                    return (
                        <div key={index}>
                            <ListComponent
                                post_id={doc?.post_id}
                                image_path={doc?.image_path}
                                content={doc?.content}
                                like_count={doc?.like_count}
                                user={doc?.user}
                                getArticles={getArticles}
                            />
                        </div>
                    )
                })}
            </main>
            <Footer />
        </>
    )
}
