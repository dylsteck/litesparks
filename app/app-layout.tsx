"use client";
import React from "react";
import { useAccount } from "wagmi";
import Login from "./components/login";

export default function AppLayout({ children }: { children: React.ReactNode }){
    const account = useAccount();
    return account ? children : <Login />
}