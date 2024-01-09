"use client";

import { FormSuccess } from "@/components/auth/form-message";
import { RoleGate } from "@/components/auth/role-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role"
import { UserRole } from "@prisma/client";

const AdminPage = () => {

  return (
    <Card className="md:w-[600px] w-[500px] shadow-md">
    <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
    </CardHeader>
    <CardContent className="space-y-4">
      <RoleGate allowedRole={UserRole.ADMIN}>
        <FormSuccess message="you are allowed to see this content"/>
      </RoleGate>
        <AdminProperties label="Admin-only API Route"/>
        <AdminProperties label="Admin-only Server action"/>
    </CardContent>
</Card>
  )
}

export default AdminPage

const AdminProperties = ({label,url}: {label: string,url?: string}) => {
  return(<div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
        <p className="text-sm font-medium">{label}</p>
        <Button size="sm" variant={"blue"}>
          test
        </Button>
    </div>)
    
}