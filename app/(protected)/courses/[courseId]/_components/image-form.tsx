"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState, ChangeEvent, FormEvent } from "react";



import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, Pencil, PlusCircle, UploadCloud, UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import Image from "next/image";
import { updateImage } from "@/actions/course/course";
import { useUploadImage } from "@/hooks/use-upload-image";
import { useEdgeStore } from "@/lib/edgestore";
import UploadImage from "./upload-image";


interface ImageFormProps {
    initialData: Course
    courseId: string
}


const formSchema = z.object({
    imageUrl: z.string().min(1, { message: "Image required" })
})

export const ImageForm = ({ initialData, courseId }: ImageFormProps
) => {

    const [isEditing, setIsEditing] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: initialData?.imageUrl || ""
        }
    });


    const toggleEdit = () => {
        setIsEditing(prev => !prev)
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course image
                <Button variant={"ghost"} onClick={toggleEdit}>
                    {isEditing && <>Cancel</>}
                    {!isEditing && initialData.imageUrl && <><Pencil className="h-4 w-4 mr-2" />Edit</>}
                    {!isEditing && !initialData.imageUrl && <><PlusCircle className="h-4 w-4 mr-2" />Add</>}
                </Button>
            </div>
            {!isEditing && (
                !initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <img
                            alt="Upload"
                            className="object-cover rounded-md w-[200px] h-[200px]"
                            src={initialData.imageUrl}
                        />
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <UploadImage id={courseId}/>
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 aspect ratio recommended
                    </div>
                </div>
            )
            }
        </div>
    )
}


