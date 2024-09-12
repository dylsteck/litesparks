/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { fetchZoraProfile } from "@/app/utils/api";
import { ZoraProfile } from "@/app/utils/types";
import { useUser } from "./context/user-context";

export default function Profile({ address }: { address: string }) {
  const user = useUser();
  const [profile, setProfile] = useState<ZoraProfile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        const fetchedProfile = await fetchZoraProfile(address);
        setProfile(fetchedProfile);
      } else {
        setProfile(user);
      }
    };

    loadProfile();
  }, [user, address]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
      <div className="p-6 text-white max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={profile.avatar}
              alt={profile.username}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="mt-5">
              <h1 className="text-2xl font-semibold">{profile.username}</h1>
              <p className="text-gray-400">{profile.displayName || profile.ensName}</p>
              <p className="text-gray-400">{profile.description}</p>
              <div className="flex space-x-4 text-gray-400">
                <p>{profile.totalFollowers} followers</p>
                <p>{profile.totalFollowing} following</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}