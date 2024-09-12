"use client";
import React from "react";
import SparksIcon from "../sparks-icon";
import { useAccount } from "wagmi";
import Login from "../login";

export default function PageLayoutRight(){
    const { address, isConnected } = useAccount();
    return(
        <div className="hidden md:block col-span-3 border-l border-gray-400 overflow-y-auto pl-3 pt-2 pb-2 md:pb-0">
            <div className="mt-2 flex flex-row gap-2 items-center">
                <SparksIcon />
                <p className="font-medium text-md text-white/80">litesparks</p>
            </div>
            <div className="mt-4 flex flex-col gap-2 items-start max-w-[60%] flex-wrap">
                <p className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                    an open source minting app
                </p>
                <p className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                    built on the <a className="underline" href="https://zora.co" target="_blank">zora protocol</a>
                </p>
            </div>
            {!address && !isConnected ? <div className="mt-2"><Login /></div> : <></>}
      </div>  
    )
}