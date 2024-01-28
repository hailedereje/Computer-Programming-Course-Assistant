"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useState, useTransition } from "react";
import { TitleSchema } from "@/schemas/zod-validation";
import { createCourseTitle } from "@/actions/course/course";
import { Loader2Icon } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@prisma/client";



const CreateCoursePage = () => {
    const user = useCurrentUser();

    const router = useRouter();
    const [isPending,startTransition] = useTransition();

    const [error,setError] = useState<string|undefined>("");
    const [success,setSuccess] = useState<string|undefined>("");
    
    const {toast} = useToast();
    const form = useForm<z.infer<typeof TitleSchema>>({
        resolver:zodResolver(TitleSchema),
        defaultValues:{
            title:undefined
        }
    });

    const onSubmit = async (value : Zod.infer<typeof TitleSchema>) =>{
        if(user?.role !== UserRole.INSTRUCTOR) return;
        startTransition( () => createCourseTitle(value,user?.id).then(data =>{
            if(data.error) toast({description:data.error,duration:5000,variant: "destructive"})
            if(data.success){ 
            toast({description:`${data.success} ${data.id}`,duration:2000,variant: "default"})
            router.push(`/courses/${data.id}`)
            }
        })) }
       

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">
                    Name Courses
                </h1>
                <p className="text-sm text-slate-600">
                    What would you like to name your course ? 
                </p>
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Course Title</FormLabel>
                                    <FormControl>
                                       <Input 
                                            disabled={isPending} 
                                            {...field} name="title"
                                            placeholder="computer programming"/> 
                                    </FormControl>
                                    <FormDescription>
                                        what will you teach in this course ?
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem> 
                            )}
                        />

                        <div className="flex items-center gap-x-2">
                            <Link href="/courses">
                                <Button variant="ghost" type="button">
                                    Cancel
                                </Button>
                            </Link>
                            
                            <Button disabled={isPending} variant="blue" type="submit" className="w-full">
                                {isPending && <span className="mr-4"><Loader2Icon className="h-4 w-4 animate-spin"/></span>}
                                {!isPending && "continue"}
                            </Button> 
                        </div>
                </form>
            </Form>
            </div>
        </div>
    )
}
export default CreateCoursePage;