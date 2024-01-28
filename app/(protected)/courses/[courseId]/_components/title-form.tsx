"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";



import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import { updateDescription, updateTitle } from "@/actions/course/course";


interface TitleProps {
    initialData :Course
    courseId : string
}


export const TitleSchema = z.object({
    title: z.string().min(1,{message :"title required"})
})

export const TitleForm = ({initialData,courseId} : TitleProps) => {

    const [isEditing,setIsEditing] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof TitleSchema>>({
        resolver : zodResolver(TitleSchema),
        defaultValues :{title: initialData.title || undefined}
    });

    const {isSubmitting,isValid} = form.formState;
    
    const toggleEdit = () => {
        setIsEditing(prev=>!prev)
    }
    const [isPending,startTransition] = useTransition()
    const onSubmit = (values : z.infer<typeof TitleSchema>)=>{
        startTransition(() => updateTitle(values,courseId).then(data =>{
            
        }))
    }
    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course title
                <Button variant={"ghost"} onClick={toggleEdit}>
                    {isEditing ? <>Cancel</> : <><Pencil className="h-4 w-4 mr-2"/>Edit</>}    
                </Button>
            </div>
            {isEditing ? 
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField 
                            control={form.control} 
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                       <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Advanced web Development'" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            <div className="flex items-center gap-x-2">
                                <Button disabled={!isValid || isSubmitting} type="submit">
                                    Save
                                </Button>
                            </div>
                    </form>
                </Form>
            </>
            :
            <>
                <p className="text-sm mt-2">
                    {initialData.title}
                </p>
            </>
        }
        </div>
    )
}