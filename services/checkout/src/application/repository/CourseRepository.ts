import { Course } from "../entities/Course"

export default interface CourseRepository {
  get(courseId: string): Promise<Course>
}