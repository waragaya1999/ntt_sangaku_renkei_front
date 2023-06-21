import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ListComponent from "@/components/List"
import { useLayoutEffect, useState } from "react"
import { ResponseDto } from "@/types/ResponseDto"
import axios from "axios"

export default function List() {
    const [doc, setDoc] = useState<ResponseDto[]>([])
    useLayoutEffect(() => {
        axios
            .get("http://localhost:8003/posts")
            .then((res) => {
                setDoc(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <>
            <Header location={"投稿"} />
            <main className={"py-16 overflow-scroll hidden-scrollbar bg-white"}>
                {doc.map((doc, index) => {
                    return (
                        <div key={index}>
                            <ListComponent
                                image_path={doc?.image_path}
                                content={doc?.content}
                                like_count={doc?.like_count}
                                user={doc?.user}
                            />
                        </div>
                    )
                })}
            </main>
            <Footer />
        </>
    )
}
