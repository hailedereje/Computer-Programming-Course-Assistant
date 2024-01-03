"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button"
import googleIcon from "@/public/icons8-google.svg";
import { DEFAULT_LOGIN_REDIRECT_PATH } from "@/route";
import { Github } from "lucide-react";
import Image from "next/image";

export const Social = () =>{
    const socialLogin = (provider: "google"|"github") => {
        signIn(provider,{
        callbackUrl:DEFAULT_LOGIN_REDIRECT_PATH
    })}

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button variant={"outline"} className="w-full" size={'lg'} onClick={() => socialLogin("google")}>
               <Image src={googleIcon} className="h-8 w-8" alt="googleicon"/>
            </Button>
            <Button className="w-full text-white" size={'lg'} onClick={() => socialLogin("github")}>
                <Github/>
            </Button>
        </div>
    )
}