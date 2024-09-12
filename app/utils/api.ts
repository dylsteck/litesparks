import { type ZoraFeedResponse } from "@/app/utils/types";

export const fetchZoraFeed = async (cursor: string, limit: number): Promise<ZoraFeedResponse> => {
    const res = await fetch(`http://localhost:3000/api/zora/feed?cursor=${cursor}&limit=${limit}`);

    if (!res.ok) {
        throw new Error("Failed to fetch Zora feed data");
    }

    return res.json();
};