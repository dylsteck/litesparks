"use client";
import { type ZoraProfile } from "@/app/utils/types";
import React from "react";
import { useAccount } from "wagmi";

const UserContext = React.createContext<{
  user: ZoraProfile | null;
  setUser: (user: ZoraProfile | null) => void;
  removeUser: () => void;
} | null>(null);

const getUserFromLocalStorage = (): ZoraProfile | null => {
  if (typeof window === "undefined") return null;
  const storedUser = localStorage.getItem("zora_user_profile");
  return storedUser ? JSON.parse(storedUser) : null;
};

const storeUserInLocalStorage = (user: ZoraProfile | null) => {
  if (typeof window !== "undefined") {
    if (user) {
      localStorage.setItem("zora_user_profile", JSON.stringify(user));
    } else {
      localStorage.removeItem("zora_user_profile");
    }
  }
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { address, isConnected } = useAccount();
  const [user, setUserState] = React.useState<ZoraProfile | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = getUserFromLocalStorage();
      if (storedUser) {
        setUserState(storedUser);
      }
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = getUserFromLocalStorage();
      if (storedUser && (!address || !isConnected)) {
        setUserState(null);
      }
    }
  }, [address, isConnected, setUserState])

  const setUser = (newUser: ZoraProfile | null) => {
    setUserState(newUser);
    storeUserInLocalStorage(newUser);
  };

  const removeUser = () => {
    setUser(null);
    storeUserInLocalStorage(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context.user;
};

export const useSetUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useSetUser must be used within a UserProvider");
  }
  return context.setUser;
};

export const useRemoveUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useRemoveUser must be used within a UserProvider");
  }
  return context.removeUser;
};