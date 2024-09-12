/* eslint-disable @next/next/no-img-element */
"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchZoraFeed } from "@/app/utils/api";
import PageLayout from "./components/page-layout";
import { ZoraFeedItem } from "@/app/utils/types";
import { SKELETON_PFP_URL } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["zoraFeed", "3", 5],
    queryFn: () => fetchZoraFeed("3", 5),
  });

  if (isLoading){
    return (
      <PageLayout>
        <div className="p-3">Loading...</div>
      </PageLayout>
    );
  }
  if (error){
    return (
      <PageLayout>
        <div className="p-3">Error loading data</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        {data?.data.map((item: ZoraFeedItem) => {
          const ipfsLink = item.media.image_preview?.raw?.replace(
            "ipfs://",
            "https://ipfs.io/ipfs/"
          );
          const dimensions = item.media.image_dimensions
            ? item.media.image_dimensions.split("x").map(Number)
            : [300, 300];
          const [width, height] = dimensions;

          return (
            <div key={item.uuid} className="pb-5 border-b border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <img
                  loading="lazy"
                  src={item.creator_profile.avatar ?? SKELETON_PFP_URL}
                  alt={item.creator_profile.username}
                  className="w-6 h-6 rounded-full"
                />
                <p>
                  <a className="cursor-pointer" href={`/${item.creator_profile.address}`}>
                    <span className="font-medium">
                      {item.creator_profile.displayName || item.creator_profile.username}{" "}
                    </span>
                  </a>
                  <span className="font-normal text-gray-500">posted</span>{" "}
                  <span className="font-semibold">{item.feed_item.token_name}</span>
                </p>
              </div>
              <div className="w-full flex justify-center mt-4">
                <Image
                  src={ipfsLink}
                  alt={item.feed_item.token_name}
                  width={width}
                  height={height}
                  className="rounded-md object-cover"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
              <div className="flex justify-between mt-4 items-center">
                <div className="flex space-x-2 text-gray-500">
                  <div className="flex items-center space-x-1">
                    <span className="text-xl">+</span>
                    <span className="text-white">{item.user_mint_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xl">💬</span>
                    <span className="text-white">{item.mint_comments_preview_and_total.total}</span>
                  </div>
                </div>
                <Button className="px-4 py-2 bg-white text-black mr-2 rounded-xl">
                  Mint
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
}