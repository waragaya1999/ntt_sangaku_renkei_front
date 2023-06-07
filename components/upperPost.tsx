import Image from "next/image";

type Props = {
    bgImage: string
}

export default function UpperPost({bgImage}: Props) {
    const upperPostsH = "calc(100vh * 0.6)"
    return (
        <div className={"rounded-2xl overflow-hidden mx-[1%]"} style={{width: "100%", height: upperPostsH}}>
            <div className={"w-[100%] h-[70%] relative"}>
                <Image src="/images/demo.jpg" alt="demo" fill style={{objectFit: "cover"}}/>
            </div>
            <div className={"w-[100%] h-[30%] flex flex-col bg-[#f1f1f1] py-3"}>
                <div className={"w-11/12 h-[20%] flex items-center m-auto"}>
                    <div
                        className={`w-[10%] ${bgImage} bg-center bg-cover bg-no-repeat pt-[10%]`}></div>
                    <p>User</p>
                </div>
                <div className={"w-[80%] h-[65%] overflow-hidden m-auto"}>
                    <p className={"overflow-ellipsis"}>Text Text Text Text Text Text Text Text Text Text
                        Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text
                        Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text
                        Text Text Text Text Text Text Text Text Text Text </p>
                </div>
                <div className={"w-fit h-[15%] self-end mr-[5%]"}>
                    <p>2167</p>
                </div>
            </div>
        </div>
    )
}