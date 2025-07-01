import { NextResponse } from "next/server";
import Ably from "ably";


const ably = new Ably.Realtime('B-ICBA.3_QW8A:R0xUh-Id8nN7NvrfkPFhkYAM343jqcRQ00W77P8-cfM')

export async function POST(req: Request) {
    const body = await req.json();
    const { userId } = body;

    const channel = ably.channels.get('matchmaking');
    await channel.publish('start', {userId});

    return NextResponse.json({
        status: 'started',
    })
}