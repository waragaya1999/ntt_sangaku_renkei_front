import Header from "@/components/Header"
import UpperPost from "@/components/UpperPost"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Footer from "@/components/Footer"
import CatList from "@/components/CatList"
import { useLayoutEffect, useState } from "react"
import axios from "axios"
import { ResponseDto } from "@/types/ResponseDto"
import { CategoriesResponseDto } from "@/types/CategoriesResponseDto"

export default function Home() {
    const [doc, setDoc] = useState<ResponseDto>({
        post_id: 0,
        image_path: "",
        content: "",
        like_count: 0,
        user: {
            user_id: 0,
            user_name: "",
            user_thumbnail_path: "",
            user_like: false,
        },
    })
    const [cat, setCat] = useState<CategoriesResponseDto[]>([])
    const [sliderRef] = useKeenSlider({
        mode: "free-snap",
        slides: {
            origin: "center",
            perView: 1.25,
            spacing: 15,
        },
    })
    useLayoutEffect(() => {
        //いいね上位5件くらいください
        axios
            .get("http://localhost:8003/article/1")
            .then((res) => {
                setDoc(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        axios
            .get("http://localhost:8003/categories")
            .then((res) => {
                setCat(res.data)
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
                        post_id={doc?.post_id}
                        image_path={doc?.image_path}
                        content={doc?.content}
                        like_count={doc?.like_count}
                        user={doc?.user}
                    />
                    <UpperPost
                        num={2}
                        post_id={doc?.post_id}
                        image_path={doc?.image_path}
                        content={doc?.content}
                        like_count={doc?.like_count}
                        user={doc?.user}
                    />
                    <UpperPost
                        num={3}
                        post_id={doc?.post_id}
                        image_path={doc?.image_path}
                        content={doc?.content}
                        like_count={doc?.like_count}
                        user={doc?.user}
                    />
                    <UpperPost
                        num={4}
                        post_id={doc?.post_id}
                        image_path={doc?.image_path}
                        content={doc?.content}
                        like_count={doc?.like_count}
                        user={doc?.user}
                    />
                    <UpperPost
                        num={5}
                        post_id={doc?.post_id}
                        image_path={doc?.image_path}
                        content={doc?.content}
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
                    {cat.map((c, i) => {
                        if (i === 0) {
                            return <CatList cat={c} mx={"ml-[5%]"} key={i} />
                        } else if (i === cat.length - 1) {
                            return <CatList cat={c} mx={"mr-[5%]"} key={i} />
                        } else {
                            return <CatList cat={c} mx={""} key={i} />
                        }
                    })}
                </div>
            </main>
            <Footer />
        </>
    )
}
