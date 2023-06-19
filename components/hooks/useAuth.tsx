import axios from "axios";
import { create } from "zustand";

const url = process.env.NEXT_PUBLIC_MOCK_URL || "";

type userDto = {
  userId: number;
  name: string;
  email: string;
  image: string;
};

const resetUser = {
  userId: 0,
  name: "",
  email: "",
  image: "",
};

type userState = {
  user: userDto;
  login: (user: any) => void;
  logout: () => void;
};

const useAuth = create<userState>((set, get) => ({
  user: resetUser,

  login: async (user: any) => {
    try {
      const sendData = {
        userName: user.name,
        email: user.email,
        imgPath: user.image,
      };

      const response = await axios.post(url + "/user", sendData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      set({
        user: {
          userId: response.data.userId,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      });
    } catch {}
  },

  logout: () => {
    set({
      user: resetUser,
    });
  },
}));

export default useAuth;
