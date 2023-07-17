import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import useAuth from "./hooks/useAuth"
import Link from "next/link"
type Props = {
    location: string
    postArticle?: (userId: number) => void
}

export default function Header({ location, postArticle }: Props) {
    const { data: session } = useSession()
    const { login, user } = useAuth()

    useEffect(() => {
        login(session?.user)
    }, [session])

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [signOutModal, setSignOutModal] = useState(false)
    const imageUrl = "/images/user.svg"
    const removeDropdown = () => {
        setDropdownOpen(false)
    }
    useEffect(() => {
        login(session?.user)
    }, [session])
    return (
        <header className={"w-full max-w-[600px] h-12 fixed bg-white z-[999]"}>
            <div className={"w-[90%] h-[100%] flex justify-between m-auto"}>
                <div className={"flex items-center position-relative"}>
                    <div className={"flex items-center"}>
                        <Image
                            src={"/images/logo.png"}
                            alt="logo"
                            width={40}
                            height={40}
                        />
                        <div className="relative ml-3">
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
                                        <Link href={"/home"}>
                                            <p
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                                onClick={removeDropdown}
                                            >
                                                ホーム
                                            </p>
                                        </Link>
                                        <Link href={"/myPage"}>
                                            <p
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                                onClick={removeDropdown}
                                            >
                                                マイページ
                                            </p>
                                        </Link>
                                        <Link href={"/list"}>
                                            <p
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                                onClick={removeDropdown}
                                            >
                                                リスト
                                            </p>
                                        </Link>
                                        <Link href={"/postArticle"}>
                                            <p
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                                onClick={removeDropdown}
                                            >
                                                投稿
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={"w-fit flex items-center flex-row-reverse"}>
                    {location === "投稿" ? (
                        postArticle && (
                            <div
                                className={
                                    "w-[25%] flex flex-row-reverse bg-blue-500 text-white rounded whitespace-nowrap p-1 pl-2"
                                }
                                onClick={() => postArticle(user.user_id)}
                            >
                                <p className={"pl-1"}>投稿する</p>
                                <img
                                    src={"/images/paperPlane.svg"}
                                    className={"w-[25%]"}
                                />
                            </div>
                        )
                    ) : session ? (
                        <Image
                            src={user.user_thumbnail_path}
                            alt="logo"
                            width={40}
                            height={40}
                            className={"rounded-full"}
                            onClick={() => setSignOutModal(!signOutModal)}
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
                    {signOutModal && (
                        <div className="absolute right-4 mt-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div
                                className="py-1"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                            >
                                <p
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                    onClick={() => signOut()}
                                >
                                    サインアウト
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
