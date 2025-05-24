
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { token } = await request.json();
    if (!token) {
        return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    (await cookies()).set("token", token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, 
    })
    return NextResponse.json({ message: "Token set successfully" }, { status: 200 });
}