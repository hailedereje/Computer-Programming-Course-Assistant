import { IconBadge } from "@/components/icon-bage";
import { db } from "@/lib/db";
import { Book, CircleDollarSign, Edit2, File, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
// import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { CatagoryForm } from "./_components/catagory-form";
import { currentUser } from "@/lib/current-user";
import { UserRole } from "@prisma/client";
import { ImageForm } from "./_components/image-form";
import { TitleForm } from "./_components/title-form";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {

    const user = await currentUser();
    const userId = user?.id;
    const courseId = params.courseId;

    if (user?.role !== UserRole.INSTRUCTOR) {
        console.log(user)
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: courseId,
        },
    });

    const catagories = await db.catagory.findMany({ orderBy: { name: "asc" } });

    if (!course) {
        return redirect("/courses/create");
    }

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.catagoryId
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 grid-flow-row gap-6 p-4">
            <div className="grid grid-flow-row">
                <div className="flex items-center gap-5">
                    <IconBadge icon={File} size={"default"} />
                    <h1 className="font-bold text-xl">Customiz the course</h1>
                </div>
                <TitleForm initialData={course} courseId={courseId} />
                <DescriptionForm initialData={course} courseId={courseId} />
                <CatagoryForm initialData={course} options={catagories.map(cat => ({ label: cat.name || "", value: cat.id }))} courseId={courseId} />
                <ImageForm courseId={courseId} initialData={course} />
            </div>

            <div className="grid grid-rows-2 grid-flow-col">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={ListChecks} />
                        <h2 className="text-xl">
                            Course Chapters
                        </h2>
                    </div>
                    <div className="mt-6 border bg-slate-100 rounded-md p-4 grid grid-flow-row">
                        <div className="flex w-full items-center space-x-5 border-slate-300 p-2 shadow-sm">
                            <IconBadge icon={Book} size={"sm"}/>
                            <p className="text-l font-bold">Chapter 1</p>
                        </div>

                        <div className="flex w-full items-center space-x-5 border-slate-300 p-2 shadow-sm">
                            <IconBadge icon={Book} size={"sm"}/>
                            <p className="text-l font-bold">Chapter 2</p>
                        </div>

                        <div className="flex w-full items-center space-x-5 border-slate-300 p-2 shadow-sm">
                            <IconBadge icon={Book} size={"sm"}/>
                            <p className="text-l font-bold">Chapter 3</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseIdPage;