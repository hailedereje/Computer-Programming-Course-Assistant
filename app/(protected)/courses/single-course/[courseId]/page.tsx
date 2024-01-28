import { getCourseById } from '@/data/courseModel'
import React from 'react'

const CourseDetailPage = async ({ params }: { params: { courseId: string } })  => {
    const course = await getCourseById(params.courseId)
  return (
    <div>
        {JSON.stringify(course)}
    </div>
  )
}

export default CourseDetailPage