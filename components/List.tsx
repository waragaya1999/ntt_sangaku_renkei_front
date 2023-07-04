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
                        <p>{like_count}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
