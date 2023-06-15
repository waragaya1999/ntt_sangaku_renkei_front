type Props = {
    mx: string
}
export default function CatList({ mx }: Props) {
    return (
        <div
            className={`w-[27%] h-[50%] flex items-center justify-center shrink-0 bg-[#f1f1f1] rounded-xl mx-[2%] ${mx}`}
        >
            <div className={"w-[80%] flex items-center"}>
                <div
                    className={
                        "w-[7vw] h-[7vw] bg-[url(/images/demo.jpg)] bg-center bg-cover bg-no-repeat rounded mr-[5%]"
                    }
                ></div>
                <p className={"text-[13px] leading-4"}>桜うんぬん</p>
            </div>
        </div>
    )
}
