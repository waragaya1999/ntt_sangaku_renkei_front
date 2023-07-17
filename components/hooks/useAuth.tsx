import axios from "axios"
import { create } from "zustand"

const url = process.env.NEXT_PUBLIC_MOCK_URL || ""

type userDto = {
    user_id: number
    user_name: string
    user_thumbnail_path: string
    email: string
}

const resetUser = {
    user_id: 0,
    user_name: "",
    user_thumbnail_path: "",
    email: "",
}

type userState = {
    user: userDto
    login: (user: any) => void
    logout: () => void
}

const useAuth = create<userState>((set, get) => ({
    user: resetUser,

    login: async (user: any) => {
        try {
            const sendData = {
                userName: user.name,
                email: user.email,
                imgPath: user.image,
            }

            const response = await axios.post(url + "/user", sendData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            set({
                user: {
                    user_id: response.data.userId,
                    user_name: user.name,
                    user_thumbnail_path: user.image,
                    email: user.email,
                },
            })
        } catch {}
    },

    logout: () => {
        set({
            user: resetUser,
        })
    },
}))

export default useAuth
