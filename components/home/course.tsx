import { getAllCourse } from '@/data/courseModel'
import CourseCard from '../course-card'

interface courseProps{
  title: string,
  description: string,
  id: string,
  image: string
}
const Course =({course}:{course?:courseProps[]}) => {
 
  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 grid-flow-row'>
      {course!.map(Item => (
        <CourseCard key={Item.title} title={Item.title!} description={Item.description!} image={Item.image}/>
      ))}

    </div>
  )
}

export default Course