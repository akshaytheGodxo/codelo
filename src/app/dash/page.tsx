"use client";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";
export default function Dashboaard() {
  const session = trpc.auth.getSession.useQuery();
  const user = trpc.auth.getUser.useMutation();

  const [userData, setUserData] = useState({
    UserID: "",
    UserName: "",
    UserEmail: "",
  });

  if (session) {
    console.log("Succes: ", session?.data?.mainToken);
  } else {
    console.log("Failed");
  }

useEffect(() => {
  if (session.isSuccess && session.data?.payload?.userId) {
    async function fetchUser() {
      try {
        const data = await user.mutateAsync({
          userId: session.data.payload.userId,
        });
        setUserData({
          UserID: data?.id?.toString() ?? "",
          UserName: data?.name ?? "",
          UserEmail: data?.email ?? "",
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }

    fetchUser();
  }
}, [session.isSuccess]);


  return (
    <div className="">
      <div className="">
        <h2>UserID: {userData.UserID}</h2>
        <h2>UserEmail: {userData.UserEmail}</h2>
        <h2>UserName: {userData.UserName}</h2>
      </div>
    </div>
  );
}
