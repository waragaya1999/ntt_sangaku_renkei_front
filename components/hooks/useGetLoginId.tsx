import { Session } from "inspector";
import { useState } from "react";

export const useGetLoginId = () => {
  const [userId, setUserId] = useState("");

  const getLoginId = (email: string) => {
    console.log("unchi" + email);
    setUserId("testUserID");
  };

  const url = "http://localhost:8003/post/1";

  const test = async function getData() {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    console.log();

    return res.json();
  };

  return { userId, getLoginId, test } as const;
};
