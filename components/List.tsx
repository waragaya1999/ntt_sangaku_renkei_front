import UpperPost from "@/components/UpperPost"
import React from "react"

type Props = Omit<React.ComponentProps<typeof UpperPost>, "num">
export default function ListComponent({
    image_path,
    content,
    like_count,
    user,
}: Props) {
    return (
        <div className={"h-[calc((100vh-8rem)*0.55)] border-t"}>
            <div className={"w-[85%] h-[91%] m-auto"}>
                <div
                    className={`h-[60%] bg-cover bg-center bg-no-repeat rounded-2xl mt-[7%]`}
                    style={{
                        backgroundImage: `url(${image_path})`,
                    }}
                ></div>
                <div className={"w-[100%] h-[40%] flex flex-col py-3"}>
                    <div className={"h-[20%] flex items-center"}>
                        <div
                            className={`w-8 h-8 bg-center bg-cover bg-no-repeat`}
                            style={{
                                backgroundImage: `url(${user.user_thumbnail_path})`,
                            }}
                        ></div>
                        <p>{user.user_name}</p>
                    </div>
                    <div className={"w-[80%] h-[65%] overflow-hidden m-auto"}>
                        <p className={"overflow-ellipsis"}>{content}</p>
                    </div>
                    <div className={"w-fit h-[15%] self-end mr-[5%]"}>
                        <p>{like_count}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
