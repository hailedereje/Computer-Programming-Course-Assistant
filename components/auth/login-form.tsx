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
import { SignInProps } from "@/schemas";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoginSchema } from "@/schemas/zod-validation";
import { FormError, FormSuccess } from "./form-error";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { useSearchParams } from "next/navigation";


export default function LoginForm({signIn}:SignInProps){
    
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with Differnt login provider":"";
   
    const [isPending,startTransition] = useTransition();

    const [error,setError] = useState<string|undefined>("");
    const [success,setSuccess] = useState<string|undefined>("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues:signIn
    });

    const onSubmit = (values : z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(
            () => login(values).then(data => {
                setError(data.error);
                setSuccess(data.success)
            })
        )
        
    }
    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account ?"
            backButtonHref="/auth/register"
            showSocial
            >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                       <Input disabled={isPending} {...field} placeholder="example@gmail.com"/> 
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem> 
                            )}
                        /> 

                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                       <Input disabled={isPending} {...field} placeholder="******"/> 
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem> 
                            )}
                        />
                    </div>
                    <FormError message={error || urlError}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending} variant="blue" type="submit" className="w-full">
                        {isPending && <span className="mr-4"><Loader2Icon className="h-4 w-4 animate-spin"/></span>}login
                    </Button> 
                </form>
            </Form>
        </CardWrapper>
    )
}