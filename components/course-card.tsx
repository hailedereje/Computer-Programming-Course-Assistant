
import {
    Button
} from "@/components/ui/button"
import { ArrowBigRight } from "lucide-react"

const CourseCard = ({title,description,image}:{title: string,description: string,image: string}) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img src={image} alt="course-image"  className="object-cover aspect-video h-25 w-full"/>
            <div className="p-5">
                <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate">{description}</p>
                <Button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                     View
                    <ArrowBigRight className="w-4 h-4 ml-4"/>
                </Button>
            </div>
        </div>


    )
}

export default CourseCard