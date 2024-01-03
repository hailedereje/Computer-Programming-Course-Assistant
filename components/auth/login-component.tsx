"use client";

import { useRouter } from "next/navigation";

interface LoginProps {
    children : React.ReactNode,
    mode?:"modal" | "redirect",
    asChild: boolean
}

export const LoginComponent = (
    {children,mode="redirect",asChild} : LoginProps
    ) => {
        const router = useRouter();
        const onClick = () => {
            router.push("/auth/login")
        }
        return (
            <span onClick={onClick} className="cursor-pointer">
                {children}
            </span>
        )
}