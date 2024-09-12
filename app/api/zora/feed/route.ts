import { NextRequest, NextResponse } from 'next/server';
import { type ZoraFeedResponse } from "@/app/utils/types";
import { ZORA_BACKEND_API } from "@/lib/utils";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const cursor = searchParams.get("cursor");
    const limit = searchParams.get("limit");

    if (!limit) {
        return NextResponse.json({ error: "Limit parameter is required" }, { status: 400 });
    }

    try {
        const zoraResponse = await fetch(`${ZORA_BACKEND_API}/discover/personalized_feed?cursor=${cursor}&limit=${limit}`);
        console.log(zoraResponse)
        if (!zoraResponse.ok) {
            return NextResponse.json({ error: "Failed to fetch data from Zora API" }, { status: zoraResponse.status });
        }

        const data: ZoraFeedResponse = await zoraResponse.json();

        if (!data) {
            return NextResponse.json({ error: "No feed data found" }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}