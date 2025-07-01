"use client";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";

import { Realtime } from "ably";
import { set } from "zod";

export default function Dashboaard() {
  const session = trpc.auth.getSession.useQuery();
  


  const [buttonStatus, setButtonStatus] = useState("Find Match");
  

  const [userData, setUserData] = useState({
    UserID: "" ,
    UserName: "" ,
    UserEmail: "" ,
  });
  
  if (session) {
    const user = trpc.auth.getUser.useMutation();
  }
  useEffect(() => {

    function FetchUserData() {
      
      const userId = session.data?.payload.userId ;

      const data = user.mutateAsync({ userId: userId });

      data.then((res) => {
        setUserData({
          UserID: res?.id.toString() || "",
          UserName: res?.name || "",
          UserEmail: res?.email || ""
        })
      })

      
    }

    const ably = new Realtime('B-ICBA.3_QW8A:R0xUh-Id8nN7NvrfkPFhkYAM343jqcRQ00W77P8-cfM');
    const channel = ably.channels.get("matchmaking");

    channel.subscribe("start", (message) => {
      console.log("Match found:", message.data.userId);
    });
    FetchUserData();
    return () => {
      channel.unsubscribe();
    };
  }, []);

  console.log("User Data:", userData);


  const handleFindMatch = async () => {
    // socketRef.current?.emit("find_match");
    setButtonStatus("Finding Match...");
    console.log("Finding Match for UserID:", userData.UserID);
    const status = await fetch("/api/matchmake", {
      method: "POST",
      body: JSON.stringify({ userId: userData.UserID }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    console.log("Matchmaking status:", status);
    setButtonStatus("Match Found!");
    console.log("Matchmaking request sent for UserID:", userData.UserID);
  };
  return (
    <div className="">
      <div className="">
        <h2>UserID: {userData.UserID}</h2>
        <h2>UserEmail: {userData.UserEmail}</h2>
        <h2>UserName: {userData.UserName}</h2>
      </div>

       
       {buttonStatus === "Find Match" ? (
        <button
          onClick={handleFindMatch}
          className="bg-purple-600 mt-20 ml-20  text-white px-4 py-2 rounded-sm cursor-pointer"
        >
          Find Match
        </button>
       ) : (
        <button className="bg-green-600 mt-20 ml-20 text-white px-4 py-2 rounded-sm cursor-pointer">
          {buttonStatus}
        </button>
       )}

    </div>
  );
}
