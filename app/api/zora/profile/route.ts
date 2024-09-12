import { NextRequest, NextResponse } from 'next/server';
import { type ZoraProfile } from "@/app/utils/types";
import { ZORA_CLIENT_API } from "@/lib/utils";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const address = searchParams.get("address");

    if (!address) {
        return NextResponse.json({ error: "Address parameter is required" }, { status: 400 });
    }

    try {
        const zoraResponse = await fetch(`${ZORA_CLIENT_API}/profiles/${address}?expandedData=true`);
        
        if (!zoraResponse.ok) {
            return NextResponse.json({ error: "Failed to fetch data from Zora API" }, { status: zoraResponse.status });
        }

        const data: ZoraProfile = await zoraResponse.json();

        if (!data) {
            return NextResponse.json({ error: "No profile data found" }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}