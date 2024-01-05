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
import {  ResetSchema } from "@/schemas/zod-validation";
import { FormError, FormSuccess } from "./form-message";
import { useState, useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { reset } from "@/actions/reset";


export default function ResetForm(){
    
    const [isPending,startTransition] = useTransition();

    const [error,setError] = useState<string|undefined>("");
    const [success,setSuccess] = useState<string|undefined>("");

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues:{}
    });

    const onSubmit = (value : z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() =>{
            reset(value).then(data =>{
                setError(data.error);
                setSuccess(data.success)
            })
        })
    }
    return (
        <CardWrapper
            headerLabel="Reset password"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
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
                                       <Input 
                                            autoComplete="off"
                                            type="text" 
                                            disabled={isPending} 
                                            {...field} 
                                            placeholder="example@gmail.com"/> 
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem> 
                            )}
                        /> 
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending} type="submit" className="w-full">
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