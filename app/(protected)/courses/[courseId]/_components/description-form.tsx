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
import { useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { DescriptionSchema } from "@/schemas/zod-validation";
import { updateDescription } from "@/actions/course/course";


interface DescriptionProps {
    initialData :Course
    courseId : string
}



export const DescriptionForm = ({initialData,courseId} : DescriptionProps) => {

    const [isEditing,setIsEditing] = useState(false);
    const router = useRouter();
    const {toast}= useToast();

    const form = useForm<z.infer<typeof DescriptionSchema>>({
        resolver : zodResolver(DescriptionSchema),
        defaultValues : {
            description : initialData.description || undefined
        }
    });

    const {isSubmitting,isValid} = form.formState;
    
    const toggleEdit = () => {
        setIsEditing(prev=>!prev)
    }
    
    const onSubmit = async (values : z.infer<typeof DescriptionSchema>)=>{
        try{
            const update = await updateDescription(values,courseId) 
        console.log(update) 
        router.refresh()
        }
         catch{
            console.log("something went wrong")
         }

    }
    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course description
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
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                       <Textarea
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'This course is about...'" {...field}/>
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
                <p className={cn("text-sm mt-2 text-slate-500 italic")}>
                    {initialData!.description || "No description"}
                </p>
            </>
        }
        </div>
    )
}