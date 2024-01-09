import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExtendedUser } from "@/next-auth";

interface UserInfoProps{
    user?: ExtendedUser,
    label: string
}
 
export const UserInfo = ({user,label}: UserInfoProps)=>{
    return ( 
        <Card className="md:w-[600px] w-[500px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">{label}</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <UserProperties label="ID" value={user?.id}/>
                <UserProperties label="Name" value={user?.name }/>
                <UserProperties label="Email" value={user?.email}/>
                <UserProperties label="Role" value={user?.role}/>
                
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                      Two Factor Authentication
                    </p>
                    <Button variant={user?.isTwoFactorEnabled ? "destructive":"blue"} size={"sm"}>
                       {user?.isTwoFactorEnabled ? "OFF":"ON"}
                    </Button>       
                </div>

            </CardContent>
        </Card>
    )
}

const UserProperties = ({label,value}:{label: string,value: any}) =>{
    return (
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-medium">
                {label}
            </p>
            <p className="truncate text-sm max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                {value}
            </p>
        </div>
    )
}