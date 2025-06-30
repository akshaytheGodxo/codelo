"use client";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";

export default function Dashboaard() {
  const session = trpc.auth.getSession.useQuery();
  const user = trpc.auth.getUser.useMutation();

  const [matched, setMatched] = useState(false);
  const [roomId, setRoomId] = useState("");
  
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





const handleFindMatch = () => {
    // socketRef.current?.emit("find_match");
  };
  return (
    <div className="">
      <div className="">
        <h2>UserID: {userData.UserID}</h2>
        <h2>UserEmail: {userData.UserEmail}</h2>
        <h2>UserName: {userData.UserName}</h2>
      </div>

      {!matched ? (
        <button
          onClick={handleFindMatch}
          className="bg-purple-600 mt-20 ml-20  text-white px-4 py-2 rounded-sm"
        >
          Find Match
        </button>
      ) : (
        <p>🎮 Match found! Room ID: {roomId}</p>
      )}

    </div>
  );
}
