"use client";
import { Button } from '@/components/ui/button';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export default function Login() {
  const { openConnectModal } = useConnectModal();

  const handleSignIn = () => {
    if(openConnectModal){
      openConnectModal();
    }
  }
  
  return (
    <Button className="bg-white hover:bg-white text-black rounded-xl" onClick={() => handleSignIn()}>
      sign in
    </Button>
  );
}