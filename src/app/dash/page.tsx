"use client";
import { trpc } from "@/lib/trpc"

export default function Dashboaard() {
    const session = trpc.auth.getSession.useQuery();
    if (session) {
        console.log("Succes: ", session?.data?.mainToken);

    } else {
        console.log("Failed");
    }
    return (
        <>
            <div className="">

            </div>
        </>
    )
}