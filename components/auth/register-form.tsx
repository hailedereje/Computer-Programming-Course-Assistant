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
import { SignInProps, SignUpProps } from "@/schemas";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoginSchema, RegisterSchema } from "@/schemas/zod-validation";
import { FormError, FormSuccess } from "./form-error";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { register } from "@/actions/register";
import { cn } from "@/lib/utils";


export default function RegisterForm({signUp}:SignUpProps){
    
    const [isPending,startTransition] = useTransition();

    const [error,setError] = useState<string|undefined>("");
    const [success,setSuccess] = useState<string|undefined>("");

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues:signUp
    });

    const {isSubmitting,isValid} = form.formState;

    const onSubmit = (values : z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(
            () => register(values).then(data => {
                setError(data.error);
                setSuccess(data.success)
            })  
        )
        console.log(isValid)
    }
    return (
        <CardWrapper
            headerLabel="Create new account"
            backButtonLabel="Already have an account ?"
            backButtonHref="/auth/login"
            showSocial
            >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6">
                    <div className="space-y-4">
                    <div className="">
                    <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                       <Input disabled={isPending} {...field} placeholder="joe"/> 
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem> 
                            )}
                        /> 

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
                        </div>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                       <Input disabled={isPending} type="password" {...field} placeholder="******"/> 
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem> 
                            )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending && isValid} variant="blue" type="submit" className={cn("w-full",isValid ? "":"cursor-not-allowed")}>
                        {isPending && <span className="mr-4"><Loader2Icon className="h-4 w-4 animate-spin"/></span>}
                        sign up
                    </Button> 
                </form>
            </Form>
        </CardWrapper>
    )
}