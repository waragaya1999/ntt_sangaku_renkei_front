import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"
import { useEffect } from "react"
import login from "@/pages/login"
import useAuth from "@/components/hooks/useAuth"
type Props = {
    location: string
}

export default function Header({ location }: Props) {
    const { login, user } = useAuth()
    const { data: session } = useSession()
    const imageUrl = "/images/user.svg"
    useEffect(() => {
        login(session?.user)
    }, [session])
    return (
        <header className={"w-full max-w-[600px] h-12 fixed bg-white z-[999]"}>
            <div className={"w-[90%] h-[100%] flex justify-between m-auto"}>
                <div className={"flex items-center"}>
                    <Image
                        src={"/images/user.svg"}
                        alt="logo"
                        width={40}
                        height={40}
                    />
                    <h2 className={"whitespace-nowrap ml-[25%]"}>{location}</h2>
                </div>
                <div className={"flex items-center"}>
                    {session ? (
                        <Image
                            src={user.user_thumbnail_path}
                            alt="logo"
                            width={40}
                            height={40}
                            onClick={() => signOut()}
                            className={"rounded-full"}
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
