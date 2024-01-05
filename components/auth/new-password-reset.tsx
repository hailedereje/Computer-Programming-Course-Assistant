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
import {  PasswordResetSchema, ResetSchema } from "@/schemas/zod-validation";
import { FormError, FormSuccess } from "./form-message";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { newPasswordVarification } from "@/actions/new-varification";


export default function NewPasswordReset(){
    
    const [isPending,startTransition] = useTransition();

    const [error,setError] = useState<string|undefined>("");
    const [success,setSuccess] = useState<string|undefined>("");

    const form = useForm<z.infer<typeof PasswordResetSchema>>({
        resolver: zodResolver(PasswordResetSchema),
        defaultValues:{}
    });

    const [loader,setLoader] = useState<boolean>(true);

    const searchParams = useSearchParams();
    const token: string = searchParams.get("token") as string;
    
    const onSubmit = (value: z.infer<typeof PasswordResetSchema>) => {
        setError("");
        setSuccess("")
        if(!token){ setError("Missing Token"); return;}
            newPasswordVarification(token,value).then(data =>{
                setError(data.error);
                setSuccess(data.success)
                setLoader(false)
            })
    }
            
    return (
        <CardWrapper
            headerLabel="Enter a new password"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
             >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>New password</FormLabel>
                                    <FormControl>
                                       <Input 
                                            autoComplete="off"
                                            type="password" 
                                            disabled={isPending} 
                                            {...field} 
                                            placeholder="******"/> 
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
                        send reset email
                    </Button> 
                </form>
            </Form>
        </CardWrapper>
    )
}