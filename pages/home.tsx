import "../styles/globals.css"
import Header from "@/components/Header"
import UpperPost from "@/components/UpperPost"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Footer from "@/components/Footer"
import CatList from "@/components/CatList"
import { useLayoutEffect, useState } from "react"
import axios from "axios"
import { ResponseDto } from "@/types/ResponseDto"

export default function Home() {
    const [doc, setDoc] = useState<ResponseDto>({
        post_id: 0,
        image_path: "",
        post_body: "",
        like_count: 0,
        user: {
            user_id: 0,
            user_name: "",
            user_thumbnail_path: "",
            user_like: false,
        },
        categories: [
            {
                category_id: 0,
                category_name: "",
                category_image_path: "",
            },
        ],
    })
    const [sliderRef] = useKeenSlider({
        mode: "free-snap",
        slides: {
            origin: "center",
            perView: 1.25,
            spacing: 15,
        },
    })
    useLayoutEffect(() => {
        axios
            .get("http://localhost:8003/post/1")
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
            <Header location={"ホーム"} />
            <main className={"h-[calc(100%-4rem)] pt-16"}>
                <div
                    className={"keen-slider"}
                    ref={sliderRef}
                    style={{ height: "calc((100vh - 8rem) * 0.8)" }}
                >
                    <UpperPost
                        num={1}
                        image_path={doc?.image_path}
                        post_body={doc?.post_body}
                        like_count={doc?.like_count}
                        user={doc?.user}
                    />
                    <UpperPost
                        num={2}
                        image_path={doc?.image_path}
                        post_body={doc?.post_body}
                        like_count={doc?.like_count}
                        user={doc?.user}
                    />
                    <UpperPost
                        num={3}
                        image_path={doc?.image_path}
                        post_body={doc?.post_body}
                        like_count={doc?.like_count}
                        user={doc?.user}
                    />
                    <UpperPost
                        num={4}
                        image_path={doc?.image_path}
                        post_body={doc?.post_body}
                        like_count={doc?.like_count}
                        user={doc?.user}
                    />
                    <UpperPost
                        num={5}
                        image_path={doc?.image_path}
                        post_body={doc?.post_body}
                        like_count={doc?.like_count}
                        user={doc?.user}
                    />
                </div>
                <div
                    className={
                        "flex items-center overflow-scroll hidden-scrollbar"
                    }
                    style={{ height: "calc((100vh - 8rem) * 0.15)" }}
                >
                    {doc?.categories.map((item, index) => (
                        <>{index === 1 ? <CatList mx={"ml-[5%]"} /> : <></>}</>
                    ))}
                    <CatList mx={"ml-[5%]"} />
                    <CatList mx={""} />
                    <CatList mx={""} />
                    <CatList mx={""} />
                    <CatList mx={"mr-[5%]"} />
                </div>
            </main>
            <Footer />
        </>
    )
}
