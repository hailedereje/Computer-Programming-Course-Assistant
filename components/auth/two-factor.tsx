"use client";

import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';

import {
    Form,
    FormControl,
    FormMessage,
    FormLabel,
    FormItem,
    FormField
} from "@/components/ui/form"
import { CardWrapper } from "./card-wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {  PasswordResetSchema, ResetSchema, TwoFactorSchema } from "@/schemas/zod-validation";
import { FormError, FormSuccess } from "./form-message";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { newPasswordVarification } from "@/actions/new-varification";
import { twoFactorLogin } from "@/actions/two-factor";


export default function TwoFactorAuth(){
    
    const [isPending,startTransition] = useTransition();

    const [error,setError] = useState<string|undefined>("");
    const [success,setSuccess] = useState<string|undefined>("");
    
    const searchParams = useSearchParams();
    const token: string = searchParams.get("token") as string;
    console.log(token)

    const form = useForm<z.infer<typeof TwoFactorSchema>>({
        resolver: zodResolver(TwoFactorSchema),
        defaultValues:{
            code:""
        }
    });


    const onSubmit = (value: z.infer<typeof TwoFactorSchema>) => {
        setError("");
        setSuccess("")
    
        if(!token){ setError("Missing Token"); return;}
        console.log(value);
        startTransition(()=>{
            twoFactorLogin(value,token).then(data =>{
                setError(data.error);
                setSuccess(data.success)
            })
        })
            
    }
            
    return (
        <CardWrapper
            headerLabel="enter 2FA code"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
             >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>2FA code</FormLabel>
                                    <FormControl>
                                       <Input 
                                           
                                            type="text" 
                                            disabled={isPending} 
                                            {...field} 
                                            placeholder="348945"/> 
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem> 
                            )}
                        /> 
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending} type="submit" className="w-full" >
                        {isPending && (
                            <span className="mr-4">
                                <Loader2Icon className="h-4 w-4 animate-spin"/>
                            </span>
                        )}
                        confirm
                    </Button> 
                </form>
            </Form>
        </CardWrapper>
    )
}