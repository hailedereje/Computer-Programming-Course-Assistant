// import { Poppins } from 'next/font/google';
import Navbar from '@/components/home/navbar';
import { isLoggedIn } from '@/hooks/use-current-user';
import Hero from '@/components/home/hero';
import Course from '@/components/home/course';
import { getAllCourse } from '@/data/courseModel';


export default async function Home() {
  const user = isLoggedIn()
  const course = await getAllCourse();
  const courseCover = course.map(c => ({title: c.title,description: c.description,id: c.id,image:c.imageUrl}))
  return (
    <main className="flex full flex-col space-y-10">
      <Hero/>
      <Course course={courseCover!}/>
    </main>
  )
}



