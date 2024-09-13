/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/outline';
import { useAccount } from "wagmi";
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { EMPTY_USER_PFP } from "@/lib/utils";
import { useSetUser, useUser } from "../context/user-context";
import { fetchZoraProfile } from "@/app/utils/api";
import SparksIcon from "../sparks-icon";

export default function PageLayoutLeft() {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const user = useUser();
  const setUser = useSetUser();
  const [hasFetchedProfile, setHasFetchedProfile] = useState(false);

  const handleProfileClick = () => {
    if (isConnected && address) {
      window.location.href = `/${address}`;
    } else if (openConnectModal) {
      openConnectModal();
    }
  };

  const fetchProfile = useCallback(async () => {
    if (address && isConnected && !hasFetchedProfile) {
      const profile = await fetchZoraProfile(address);
      setUser(profile);
      setHasFetchedProfile(true);
    }
  }, [address, isConnected, hasFetchedProfile, setUser]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <nav className="border-t border-gray-400 fixed bottom-0 w-full md:relative md:border-t-0 md:border-r md:border-gray-400 md:w-auto md:flex justify-end items-start pr-0 pt-0 md:pr-2 md:pt-3">
      <div className="flex justify-around bg-black p-3 md:hidden">
        <Link href="/">
          <HomeIcon className="w-6 h-6 text-white/90" />
        </Link>
        <button onClick={handleProfileClick}>
          <img
            src={user?.avatar || EMPTY_USER_PFP}
            alt="User PFP"
            className="w-6 h-6 object-contain rounded-full"
          />
        </button>
      </div>
      
      <div className="hidden md:flex md:flex-col md:gap-5">
        <div className="mb-2">
          <SparksIcon />
        </div>
        <Link href="/">
          <HomeIcon className="w-6 h-6 text-white/90" />
        </Link>
        <button onClick={handleProfileClick}>
          <img
            src={user?.avatar || EMPTY_USER_PFP}
            alt="User PFP"
            className="w-6 h-6 object-contain rounded-full"
          />
        </button>
      </div>
    </nav>
  );
}