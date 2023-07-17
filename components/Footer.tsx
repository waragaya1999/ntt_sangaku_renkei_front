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
                    <div
                        className={
                            "w-10 h-10 flex items-center justify-center bg-[#d9d9d9] rounded"
                        }
                    >
                        <img
                            src={"/images/home.svg"}
                            alt="home"
                            className={"w-[80%] opacity-50"}
                        />
                    </div>
                </Link>
                <Link href={"/list"}>
                    <div
                        className={
                            "w-10 h-10 flex items-center justify-center bg-[#d9d9d9] rounded"
                        }
                    >
                        <img
                            src={"/images/search.svg"}
                            alt="home"
                            className={"w-[80%] opacity-50"}
                        />
                    </div>
                </Link>
                <Link href={"/postArticle"}>
                    <div
                        className={
                            "w-10 h-10 flex items-center justify-center bg-[#d9d9d9] rounded"
                        }
                    >
                        <img
                            src={"/images/post.svg"}
                            alt="home"
                            className={"w-[90%] opacity-50"}
                        />
                    </div>
                </Link>
                <Link href={"/myPage"}>
                    <div
                        className={
                            "w-10 h-10 flex items-center justify-center bg-[#d9d9d9] rounded"
                        }
                    >
                        <img
                            src={"/images/myPage.svg"}
                            alt="home"
                            className={"w-[80%] opacity-50"}
                        />
                    </div>
                </Link>
            </div>
        </footer>
    )
}
