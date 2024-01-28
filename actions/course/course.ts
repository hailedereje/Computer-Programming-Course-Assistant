"use server"
import { postCourse } from "@/data/courseModel";
import { useUploadImage } from "@/hooks/use-upload-image";
import { db } from "@/lib/db";
import { CatagorySchema, DescriptionSchema, TitleSchema } from "@/schemas/zod-validation";
import { z } from "zod";

interface CouresResponse {
    error?: string,
    success?: string,
    id?: string
}


export const  createCourseTitle = async (value: z.infer<typeof TitleSchema>,userId: string): Promise<CouresResponse> =>{
    const validateFields = TitleSchema.safeParse(value)
    if(!validateFields.success) return {error:"Invalid fields"}
    const {title} = validateFields.data;
    try{
        const id = await postCourse(title,userId);
        return {success: "course created successfully",id:id}
    }
    catch{
        return {error: "course not created"}
    }
    

}

export const updateCatagory = async (value: z.infer<typeof CatagorySchema>,courseId: string): Promise<CouresResponse> => {
    const validateFields = CatagorySchema.safeParse(value)
    if(!validateFields.success) return {error:"Invalid fields"}
    const {catagoryId} = validateFields.data;
    try{
        await db.course.update({where: {id: courseId},data:{catagoryId}})
        return {success: "course updated successfully"}
    }catch{
        return {error: "course not updated"}
    }
}

export const updateDescription = async (value: z.infer<typeof DescriptionSchema>,courseId: string): Promise<CouresResponse> => {
    const validateFields = DescriptionSchema.safeParse(value)
    if(!validateFields.success) return {error:"Invalid fields"}
    const {description} = validateFields.data;
    console.log(description)
    try{
        await db.course.update({where: {id: courseId},data:{description}})
        return {success: "course updated successfully"}
    }catch{
        return {error: "course not updated"}
    }
}

export const updateTitle = async (value: z.infer<typeof TitleSchema>,courseId: string): Promise<CouresResponse> => {
    const validateFields = TitleSchema.safeParse(value)
    if(!validateFields.success) return {error:"Invalid fields"}
    const {title} = validateFields.data;
    console.log(title)
    try{
        await db.course.update({where: {id: courseId},data:{title:title}})
        return {success: "course updated successfully"}
    }catch{
        return {error: "course not updated"}
    }
}

export const updateImage = async(url: string,id: string) => {
    await db.course.update({where: {id},data: {imageUrl: url}})
}

export const isUrl = async (id: string) =>{
    try{
        const course = await db.course.findFirst({where: {id}})
        return course?.imageUrl
}catch{
        return null;
    }
}