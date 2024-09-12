/* eslint-disable @next/next/no-img-element */
"use client";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  return (
    <div>
        {address ? 
            <>
                {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
                {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
                <button className="mt-2 px-2.5 py-1 rounded-lg bg-white text-black" onClick={() => disconnect()}>Disconnect</button>
            </>
         : <ConnectButton />
         }
    </div>
  )
}