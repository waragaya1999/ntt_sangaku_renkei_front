import Image from "next/image";

export default function Header() {
    const imageUrl = "/images/user.svg"
    return(
        <header className={"w-full fixed bg-white z-[999]"}>
            <div className={"w-[90%] h-12 flex justify-between m-auto"}>
                <div className={"flex items-center"}>
                    <Image src={imageUrl} alt="logo" width={40} height={40}/>
                    <h2 className={"whitespace-nowrap ml-[25%]"}>ホーム</h2>
                </div>
                <div className={"flex items-center"}>
                    <Image src={"/images/user.svg"} alt="logo" width={40} height={40}/>
                </div>
            </div>
        </header>
    )
}