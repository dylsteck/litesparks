/* eslint-disable @next/next/no-img-element */
"use client"; 
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChatAltIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { fetchZoraFeed } from "@/app/utils/api";
import PageLayout from "./components/page-layout";
import { ZoraFeedItem, ZoraFeedResponse } from "@/app/utils/types";
import { EMPTY_USER_PFP } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ZoraFeedResponse>({
    queryKey: ["zoraFeed"],
    queryFn: ({ pageParam = { first: "3", last: "" } }) =>
      fetchZoraFeed((pageParam as { first: string; last: string }).first, 5),
    getNextPageParam: (lastPage) => {
      return lastPage?.cursor?.last ? { first: lastPage.cursor.last, last: lastPage.cursor.first } : undefined;
    },
    initialPageParam: { first: "3", last: "" },
  });

  React.useEffect(() => {
    if (loadMoreRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 1.0 }
      );

      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="p-3 flex justify-center">
          <div className="animate-spin w-10 h-10 border-4 border-t-4 border-gray-200 rounded-full" />
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="p-3">Error loading data</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        {data?.pages.flatMap((page) =>
          page.data.map((item: ZoraFeedItem) => {
            const ipfsLink = item.media.image_preview?.raw?.startsWith("ipfs://")
              ? `https://ipfs.io/ipfs/${item.media.image_preview.raw.slice(7)}`
              : item.media.image_preview?.raw;

            return (
              <div key={item.uuid} className="pb-5 border-b border-gray-200">
                <div className="flex items-center space-x-2 p-3 pb-0">
                  <img
                    src={item.creator_profile.avatar ? (item.creator_profile.avatar.startsWith("ipfs://") ? `https://ipfs.io/ipfs/${item.creator_profile.avatar.slice(7)}` : item.creator_profile.avatar) : EMPTY_USER_PFP}
                    alt={item.creator_profile.username}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <p>
                    <a
                      className="cursor-pointer"
                      href={`/${item.creator_profile.address}`}
                    >
                      <span className="font-medium">
                        {item.creator_profile.displayName ||
                          item.creator_profile.username}{" "}
                      </span>
                    </a>
                    <span className="font-normal text-gray-500">posted</span>{" "}
                    <span className="font-semibold">
                      {item.feed_item.token_name}
                    </span>
                  </p>
                </div>
                <div className="w-full flex justify-center mt-4">
                  <img
                    src={ipfsLink ?? ''}
                    alt={item.feed_item.token_name}
                    className="w-full object-cover"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
                <div className="flex justify-between mt-5 items-center p-3 pt-0">
                  <div className="flex space-x-2 text-gray-500">
                    <div className="flex items-center space-x-1">
                      <PlusCircleIcon className="text-white w-4 h-4" />
                      <span className="text-white">{item.user_mint_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xl">
                        <ChatAltIcon className="text-white w-4 h-4" />
                      </span>
                      <span className="text-white">
                        {item.mint_comments_preview_and_total.total}
                      </span>
                    </div>
                  </div>
                  <Button className="px-4 py-2 bg-white text-black mr-2 rounded-xl">
                    mint
                  </Button>
                </div>
              </div>
            );
          })
        )}
        {(isFetchingNextPage || hasNextPage) && (
          <div ref={loadMoreRef} className="p-3 text-center">
            {isFetchingNextPage && (
              <div className="animate-spin w-10 h-10 border-4 border-t-4 border-gray-200 rounded-full" />
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
}