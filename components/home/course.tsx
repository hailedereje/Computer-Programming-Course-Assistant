import { getAllCourse } from '@/data/courseModel'
import CourseCard from '../course-card'

type courseProps = {
  title: string | null; // Adjust the type of 'title'
  description: string | null;
  id: string;
  image: string | null;
};

const Course =({course}:{course:courseProps[]}) => {
 
  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 grid-flow-row px-4'>
      {course!.map(Item => (
        <CourseCard key={Item.title} title={Item.title!} description={Item.description!} image={Item.image!} id={Item.id}/>
      ))}

    </div>
  )
}

export default Course