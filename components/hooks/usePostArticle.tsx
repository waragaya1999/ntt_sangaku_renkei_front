import axios from "axios";
import { ChangeEvent, useState } from "react";
import { create } from "zustand";
import useAuth from "./useAuth";

const url = process.env.NEXT_PUBLIC_MOCK_URL || "";

type articleDto = {
  userId: number;
  imagePath: string;
  body: string;
  categories: number[];
};

const resetArticle: articleDto = {
  userId: 0,
  imagePath: "",
  body: "",
  categories: [0],
};

type postArticleState = {
  article: articleDto;

  getImagePath: (image: any) => any;
  postArticle: (article: articleDto) => void;
  resetArticle: () => void;
};

const usePostArticle = create<postArticleState>((set, get) => ({
  article: resetArticle,

  getImagePath: async (image: any) => {
    try {
      //Todo URL確認
      const response = await axios.post(url + "", image, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Todo ここを確認
      set((state) => ({
        article: {
          ...state.article,
          imagePath: response.data.imagePath || "imagePathNotFound",
        },
      }));
    } catch (error) {
      console.log(error);
    }
  },

  postArticle: async () => {
    try {
      //Todo URL確認
      const response = await axios.post(url + "", get().article, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  resetArticle: () => {
    set({
      article: resetArticle,
    });
  },
}));

// ページでの処理
type inputArticleState = {
  inputArticle: articleDto;
  imagePathOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  bodyOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  categoriesOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  resetArticle: () => void;
  postArticle: () => void;
};

// APIへの処理
const useInputArticle = create<inputArticleState>((set, get) => ({
  inputArticle: resetArticle,

  imagePathOnChange: (event: ChangeEvent<HTMLInputElement>) => {
    set((state) => ({
      inputArticle: {
        ...state.inputArticle,
        imagePath: event.target.value,
      },
    }));
  },

  bodyOnChange: (event: ChangeEvent<HTMLInputElement>) => {
    set((state) => ({
      inputArticle: {
        ...state.inputArticle,
        imagePath: event.target.value,
      },
    }));
  },

  // Todo 大変そうだからとりあえずStringでやった
  categoriesOnChange: (event: ChangeEvent<HTMLInputElement>) => {
    set((state) => ({
      inputArticle: {
        ...state.inputArticle,
        imagePath: event.target.value,
      },
    }));
  },

  resetArticle: () => {
    set({
      inputArticle: resetArticle,
    });
  },

  postArticle: () => {
    usePostArticle().postArticle(get().inputArticle);
  },
}));

export default { usePostArticle, useInputArticle } as const;
