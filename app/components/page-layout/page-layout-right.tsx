"use client";
import React from "react";
import Login from "../login";
import { useUser } from "../context/user-context";

export default function PageLayoutRight(){
    const user = useUser();
    return(
        <div className="hidden md:block col-span-3 border-l border-gray-400 overflow-y-auto pl-3 pt-1 pb-2 md:pb-0">
            {!user ? <div className="mt-2"><Login /></div> : <></>}
      </div>  
    )
}