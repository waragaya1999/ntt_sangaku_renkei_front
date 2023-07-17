import UpperPost from "@/components/UpperPost"
import axios from "axios"
import React from "react"
import useAuth from "./hooks/useAuth"

type Props = Omit<React.ComponentProps<typeof UpperPost>, "num"> & {
    getArticles: () => void
}

export default function ListComponent({
    post_id,
    image_path,
    content,
    like_count,
    user,
    getArticles,
}: Props) {
    const { user: AuthUser } = useAuth()
    const toggle_like = async (user_like: boolean) => {
        const url =
            process.env.NEXT_PUBLIC_MOCK_URL + `/article/${post_id}/like`

        console.log(url)

        const userData = {
            userName: AuthUser.user_name,
            email: AuthUser.email,
            imgPath: AuthUser.user_thumbnail_path,
        }
        if (!user_like) {
            try {
                // const response = await axios.delete(url, userData)
                const response = await axios({
                    method: "delete",
                    url: url,
                    data: userData,
                })
                console.log("response: " + response)
                getArticles()
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const response = await axios.put(url, userData)
                // await axios.put(url, {
                //     params: userData,
                //     headers: {
                //         accept: "application/json",
                //         "Content-Type": "application/json",
                //     },
                // })
                console.log("response: " + response.data)
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <div className={"h-fit border-t"}>
            <div className={"w-[85%] h-fit m-auto"}>
                <div
                    className={`h-[50vw] bg-cover bg-center bg-no-repeat rounded-2xl mt-[7%]`}
                    style={{
                        backgroundImage: `url(${image_path})`,
                    }}
                ></div>
                <div className={"w-[100%] h-fit flex flex-col py-3"}>
                    <div className={"h-[20%] flex items-center"}>
                        <div
                            className={`w-8 h-8 bg-center bg-cover bg-no-repeat`}
                            style={{
                                backgroundImage: `url(${user.user_thumbnail_path})`,
                            }}
                        ></div>
                        <p>{user.user_name}</p>
                    </div>
                    <div
                        className={"w-[80%] h-fit overflow-hidden m-auto py-3"}
                    >
                        <p className={"overflow-ellipsis"}>{content}</p>
                    </div>
                    <div className={"w-fit h-fit self-end mr-[5%]"}>
                        <p className="flex">
                            <div onClick={() => toggle_like(user.user_like)}>
                                {user.user_like ? "❤️" : "♡"}
                            </div>
                            {like_count}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
