"use server"

import { db } from "@/lib/db"


export const getAllCourse = async ()=>{
    const course = await db.course.findMany();
    return course
}
export const postCourse = async(title:string,id: string) => {
        try{
            const course = await db.course.create({ data: { title:title,userId:id } })
            return course.id;
        }catch{
            return null!;
        }
     
}

export const getCourseById = async(id : string) => {
        try{
            return await db.course.findUnique({ where: { id } });
        }catch{
             return null!;
        }     
}

export const getCourseByUserId = async(id : string) => {
    try{
        return await db.course.findFirst({ where: {userId: id } });
    }catch{
         return null!;
    }     
}

export const getCatagories = async() => {
    const catagories = await db.catagory.findMany({orderBy:{ name : "asc"}});
    return catagories!
}

