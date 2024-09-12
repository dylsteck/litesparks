/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ZoraProfile, type ZoraFeedResponse } from "@/app/utils/types";
import { LITESPARKS_API } from "@/lib/utils";

export const fetchZoraFeed = async (cursor: string, limit: number): Promise<ZoraFeedResponse> => {
    const res = await fetch(`${LITESPARKS_API}/api/zora/feed?cursor=${cursor}&limit=${limit}`);

    if (!res.ok) {
        throw new Error("Failed to fetch Zora feed data");
    }

    return res.json();
};

export const fetchZoraProfile = async (address: string): Promise<ZoraProfile> => {
    const res = await fetch(`${LITESPARKS_API}/api/zora/profile?address=${address}`);

    if (!res.ok) {
        throw new Error("Failed to fetch Zora profile data");
    }

    return res.json();
};

export const fetchProfileTokens = async (userAddress: string, limit: number): Promise<any> => {
    const res = await fetch(`${LITESPARKS_API}/api/profile/tokens?userAddress=${userAddress}&limit=${limit}`);

    if (!res.ok) {
        throw new Error("Failed to fetch profile tokens");
    }

    return res.json();
};