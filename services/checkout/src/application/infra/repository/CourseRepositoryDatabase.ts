import { Course } from "../../entities/Course"
import CourseRepository from "../../repository/CourseRepository"
import prismaClient from "../database/prismaClient"

export class CourseRepositoryDatabase implements CourseRepository {
  async get(courseId: string): Promise<Course> {
    const courseData = await prismaClient.course.findUnique({ where: { courseId } })

    if (!courseData) throw Error("Course not found")

    return new Course(courseData.courseId, courseData.name, Number(courseData.amount))
  }
}