import { cn } from '@/lib/utils'
import CourseCard from '../course-card'

const UserCourse = ({page}:{page: string}) => {
  return (
    <div className={cn(page ==="user-courses" ? "":"hidden")}>
        <CourseCard title='Object oriented Programming (Java)' description='oop with detail examples and solutions' path='/'/>
    </div>
  )
}

export default UserCourse