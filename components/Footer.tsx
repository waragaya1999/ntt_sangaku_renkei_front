import Link from "next/link"

export default function Footer() {
    return (
        <footer
            className={"w-full max-w-[600px] h-16 fixed bottom-0 bg-[#f1f1f1]"}
        >
            <div
                className={
                    "w-[80%] h-full flex items-center justify-between m-auto"
                }
            >
                <Link href={"/home"}>
                    <div className={"w-10 h-10 bg-[#d9d9d9] rounded"}></div>
                </Link>
                <Link href={"/list"}>
                    <div className={"w-10 h-10 bg-[#d9d9d9] rounded"}></div>
                </Link>
                <div className={"w-10 h-10 bg-[#d9d9d9] rounded"}></div>
                <div className={"w-10 h-10 bg-[#d9d9d9] rounded"}></div>
            </div>
        </footer>
    )
}
