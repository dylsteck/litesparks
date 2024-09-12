"use client";
import React from "react";
import { Button } from '@/components/ui/button';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useSetUser } from "./context/user-context";
import { fetchZoraProfile } from "../utils/api";

export default function Login() {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const setUser = useSetUser();

  const handleSignIn = () => {
    if (openConnectModal) {
      openConnectModal();
    }
  };

  React.useEffect(() => {
    const fetchProfile = async () => {
      const profile = await fetchZoraProfile(address ?? "");
      setUser(profile);
    };
    if (address && isConnected) {
      fetchProfile();
    }
  }, [address, isConnected, setUser]);

  return (
    <Button className="bg-white hover:bg-white text-black rounded-xl" onClick={() => handleSignIn()}>
      sign in
    </Button>
  );
}