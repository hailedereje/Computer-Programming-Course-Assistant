import { FormErrorProps } from "@/schemas";
import {AlertTriangle, CheckCircleIcon} from "lucide-react";



export const FormError = ({message}:FormErrorProps) => {
    if(!message) return null;
    return (
        <div className="bg-red-100 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
            <AlertTriangle className="animate-pulse h-4 w-4"/>
            <p>{message}</p>
        </div>
    )
}

export const FormSuccess = ({message}:FormErrorProps) => {
    if(!message) return null;
    return (
        <div className="bg-emerald-100 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
            <CheckCircleIcon className="h-4 w-4"/>
            <p className="">{message}</p>
        </div>
    )
}