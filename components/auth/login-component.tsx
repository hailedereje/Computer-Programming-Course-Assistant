"use client";


import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import LoginForm from "./login-form";

interface LoginProps {
    children : React.ReactNode,
    mode?:"modal" | "redirect",
    asChild: boolean
}

export const LoginComponent = ({children,mode="modal",asChild} : LoginProps) => {
       
    if(mode === "modal"){

        return (<Dialog>
            <DialogTrigger asChild={asChild}>
                {children}
            </DialogTrigger>
            <DialogContent className="p-0 w-auto bg-transparent border-none">
                <LoginForm/>
            </DialogContent>
        </Dialog>)
    }
    const router = useRouter();
        const onClick = async () => {
            router.push("/auth/login")
        }
        return (
            <span onClick={onClick} className="cursor-pointer">
                {children}
            </span>
        )
}