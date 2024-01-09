"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "./form-message";
import { UserRole } from "@prisma/client";

interface RoleGateProps{
    children : React.ReactNode,
    allowedRole: UserRole
}

export const RoleGate  = ({children,allowedRole}: RoleGateProps) => {
    const role = useCurrentRole();
    if(role !== allowedRole) {
        return (
            <FormError message="You do not the the permission to view this content"/>
        )
    }

    return (
        <>
            {children}
        </>
    )
}