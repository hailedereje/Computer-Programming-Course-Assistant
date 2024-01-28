"use client";

import { useProfilePageState } from "@/app/state/state";
import { ProfileUpdateForm } from "@/components/auth/settings/profile-update-form";
import { NavLink } from "@/components/home/navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserCourse from "@/components/user/user-course";
import { List, PersonStanding } from "lucide-react";

const SettingsPage = () => {

  const { page } = useProfilePageState()


  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙️ User Profile</p>
      </CardHeader>
      <CardContent className="grid grid-cols-4  grid-flow-col gap-6">
        <div className="col-span-1 flex flex-col">
          <NavLink title="Profile" icon={PersonStanding} href="profile" />
          <NavLink title="My Courses" icon={List} href="user-courses" />
        </div>
        <ProfileUpdateForm page={page}/>
        <UserCourse page={page}/>
      </CardContent>
    </Card>

  )
}

export default SettingsPage

