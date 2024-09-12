"use client";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  optimism,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import React from 'react';

const config = getDefaultConfig({
    appName: 'Litesparks',
    projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "",
    chains: [mainnet, optimism, base],
    ssr: true,
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode}){
    return (
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider initialChain={base}>
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
    );
}

