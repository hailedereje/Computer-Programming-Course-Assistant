"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { AlertTriangle } from "lucide-react";



const ErrorPage = ()=>{

    return (
        <CardWrapper
            headerLabel="Ooops something went wrong !"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
            showSocial={false}
        >
            <div className="w-full flex justify-center items-center">
                <AlertTriangle className="text-destructive"/>
            </div>
        </CardWrapper>
    )
}

export default ErrorPage;