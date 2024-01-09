"use client";

import { logout } from "@/actions/logout";

interface LogOutProps{
     children?: React.ReactNode
}

export const LogOut = ({children}: LogOutProps) =>{
    return (
        <span onClick={()=> logout()} className="cursor-pointer">
            {children}
        </span>
    )
}