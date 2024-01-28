import { currentUser, currentUserRole } from "@/lib/current-user";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(){
    const role = await currentUserRole();

    if(role === UserRole.ADMIN){
        const user = await currentUser()
        return  NextResponse.json(null,{status: 200})
    }
    return new NextResponse(null,{status: 403})
}