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
import { Pencil } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Catagory, Course } from "@prisma/client";
import { Combobox } from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";
import { CatagorySchema } from "@/schemas/zod-validation";
import { updateCatagory } from "@/actions/course/course";
import { db } from "@/lib/db";
import { getCatagories } from "@/data/courseModel";


interface CatagoryFormProps {
    initialData :Course;
    courseId : string;
    options: {label: string,value: string}[]
}

export const CatagoryForm = ({initialData,courseId,options} : CatagoryFormProps) => {

    const [isEditing,setIsEditing] = useState(false);
    
    const form = useForm<z.infer<typeof CatagorySchema>>({
        resolver : zodResolver(CatagorySchema),
        defaultValues : {
            catagoryId : initialData?.catagoryId || undefined
        }
    });

    const [isPending,startTransition] = useTransition()
    const {isValid,isSubmitting} = form.formState;
    const toggleEdit = () => { setIsEditing(prev=>!prev) }

    const onSubmit = (values : z.infer<typeof CatagorySchema>)=>{
           startTransition(() => updateCatagory(values,courseId).then(
            data => {
                console.log(data)
            }
           ))
    }

    const selectedOption = options.find((option) => option.value === initialData.catagoryId)

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Catagory
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
                            name="catagoryId"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                       <Combobox options={options} {...field}/>
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
                <p className={cn("text-sm mt-2",!initialData.description && "text-slate-500 italic")}>
                    {selectedOption?.label  || "No Catagory"}
                </p>
            </>
        }
        </div>
    )
}