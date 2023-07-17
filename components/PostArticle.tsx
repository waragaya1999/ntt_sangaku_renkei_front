import Image from "next/image"
import usePostArticle, {
    articleDto,
    categoryDto,
} from "@/components/hooks/usePostArticle"
import { useEffect, useState, useRef, ChangeEvent } from "react"
import { element } from "prop-types"

type Props = {
    user: {
        user_id: number
        user_name: string
        user_thumbnail_path: string
        email: string
    }
    article: articleDto
    categories: categoryDto[]
    getImagePath: (event: ChangeEvent<HTMLInputElement>) => void
    clearImagePath: () => void
    bodyOnChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
    categoriesOnChange: (event: number[]) => void
}

export default function PostArticle({
    user,
    article,
    categories,
    getImagePath,
    clearImagePath,
    bodyOnChange,
    categoriesOnChange,
}: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }
    const resetImagePath = () => {
        clearImagePath()
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const [array, setArray] = useState<number[]>([])

    const handleClick = (element: number) => {
        const index = array.indexOf(element)

        if (index !== -1) {
            const updatedArray = [...array]
            updatedArray.splice(index, 1)
            categoriesOnChange(updatedArray)
            setArray(updatedArray)
        } else {
            categoriesOnChange([...array, element])
            setArray([...array, element])
        }
    }

    return (
        <div className={`h-[100%] rounded-2xl overflow-hidden`}>
            <div className={"w-[100%] h-[60%] relative bg-gray-300"}>
                {article.imgPath !== "" ? (
                    <div
                        className={
                            "w-hull h-full bg-center bg-cover bg-no-repeat"
                        }
                        style={{ backgroundImage: `url(${article.imgPath})` }}
                    >
                        <img
                            src={"/images/cancel.svg"}
                            className={
                                "w-[5%] absolute top-2 right-2 opacity-80"
                            }
                            onClick={resetImagePath}
                        />
                    </div>
                ) : (
                    <div
                        className={
                            "w-full h-full flex items-center justify-center"
                        }
                        onClick={handleImageClick}
                    >
                        <img
                            src={"/images/post.svg"}
                            alt="demo"
                            className={"w-[20%] opacity-50"}
                        />
                    </div>
                )}
            </div>
            <div className={"w-[100%] h-[40%] flex flex-col bg-[#f1f1f1] py-3"}>
                <div className={"w-11/12 h-[10%] flex items-center m-auto"}>
                    <div
                        className={
                            "w-8 h-8 bg-center bg-cover bg-no-repeat rounded-full mr-2"
                        }
                        style={{
                            backgroundImage: `url(${user.user_thumbnail_path})`,
                        }}
                    ></div>
                    <p>{user.user_name}</p>
                </div>
                <div className={"w-[90%] h-[60%] overflow-hidden m-auto pt-3"}>
                    <textarea
                        className={
                            "w-full h-full rounded-2xl resize-none focus:border py-2 px-4"
                        }
                        onChange={(event) => bodyOnChange(event)}
                    ></textarea>
                </div>
                <div className={"w-[90%] h-[30%] flex flex-wrap m-auto pt-3"}>
                    {categories.map((category, i) => (
                        <div
                            key={i}
                            className={
                                "w-fit h-fit bg-white rounded ml-2 px-2 py-1"
                            }
                            style={{
                                backgroundColor: array.includes(i + 1)
                                    ? "rgb(59 130 246)"
                                    : "",
                                color: array.includes(i + 1) ? "white" : "",
                            }}
                            onClick={() => handleClick(i + 1)}
                        >
                            {category.category_name}
                        </div>
                    ))}
                </div>
            </div>
            <input
                type="file"
                id="file"
                className={"hidden"}
                ref={fileInputRef}
                onChange={(event) => getImagePath(event)}
            />
        </div>
    )
}
