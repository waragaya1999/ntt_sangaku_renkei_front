import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import useAuth from "./hooks/useAuth"
type Props = {
    location: string
}

export default function Header({ location }: Props) {
    const { data: session } = useSession()
    const { login, user } = useAuth()

    useEffect(() => {
        login(session?.user)
    }, [session])

    const signOutOnClick = () => {
        if (window.confirm("サインアウトしますか？")) {
            signOut()
        }
    }
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const imageUrl = "/images/user.svg"
    return (
        <header className={"w-full max-w-[600px] h-12 fixed bg-white z-[999]"}>
            <div className={"w-[90%] h-[100%] flex justify-between m-auto"}>
                <div className={"flex items-center position-relative"}>
                    <div className={"flex items-center"}>
                        <Image
                            src={"/images/user.svg"}
                            alt="logo"
                            width={40}
                            height={40}
                        />
                        <div className="relative ml-[25%]">
                            <h2
                                className={"whitespace-nowrap cursor-pointer"}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                {location}
                            </h2>
                            {dropdownOpen && (
                                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div
                                        className="py-1"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="options-menu"
                                    >
                                        <a
                                            href="/home"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            ホーム
                                        </a>
                                        <a
                                            href="/mypage"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            マイページ
                                        </a>
                                        <a
                                            href="/list"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            リスト
                                        </a>
                                        <a
                                            href="/postArticle"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            投稿
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={"flex items-center"}>
                    {session ? (
                        <Image
                            src={"/images/loggedIn.svg"}
                            alt="logo"
                            width={40}
                            height={40}
                            onClick={() => signOutOnClick()}
                        />
                    ) : (
                        <Image
                            src={imageUrl}
                            alt="logo"
                            width={40}
                            height={40}
                            onClick={() => signIn()}
                        />
                    )}
                </div>
            </div>
        </header>
    )
}
