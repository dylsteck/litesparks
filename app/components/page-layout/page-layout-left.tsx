/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/outline';
import { useAccount } from "wagmi";
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { SKELETON_PFP_URL } from "@/lib/utils";
import { useSetUser, useUser } from "../context/user-context";
import { fetchZoraProfile } from "@/app/utils/api";

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
    <nav className="col-span-1 md:col-span-3 border-r border-gray-400 overflow-y-auto relative md:flex justify-end items-start pr-0 pt-0 md:pr-2 md:pt-3">
      <div className="hidden md:flex md:flex-col md:gap-5">
        <Link href="/">
          <HomeIcon className="w-6 h-6 text-white/90" />
        </Link>
        <button onClick={handleProfileClick}>
          <img
            src={user?.avatar || SKELETON_PFP_URL}
            alt="User PFP"
            className="w-6 h-6 object-contain rounded-full"
          />
        </button>
      </div>
    </nav>
  );
}