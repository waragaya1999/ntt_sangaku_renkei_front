import Image from "next/image"

type Props = {
    num: number
    image_path: string
    post_body: string
    like_count: number
    user: {
        user_id: number
        user_name: string
        user_thumbnail_path: string
        user_like: boolean
    }
}

export default function UpperPost({
    num,
    image_path,
    post_body,
    like_count,
    user,
}: Props) {
    return (
        <div
            className={`h-[100%] rounded-2xl overflow-hidden keen-slider__slide number-slide${num}`}
        >
            <div className={"w-[100%] h-[70%] relative"}>
                <Image
                    src={image_path}
                    alt="demo"
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>
            <div className={"w-[100%] h-[30%] flex flex-col bg-[#f1f1f1] py-3"}>
                <div className={"w-11/12 h-[20%] flex items-center m-auto"}>
                    <div
                        className={`w-[10%] bg-center bg-cover bg-no-repeat pt-[10%]`}
                        style={{
                            backgroundImage: `url(${user.user_thumbnail_path})`,
                        }}
                    ></div>
                    <p>{user.user_name}</p>
                </div>
                <div className={"w-[80%] h-[65%] overflow-hidden m-auto"}>
                    <p className={"overflow-ellipsis"}>{post_body}</p>
                </div>
                <div className={"w-fit h-[15%] self-end mr-[5%]"}>
                    <p>{like_count}</p>
                </div>
            </div>
        </div>
    )
}
