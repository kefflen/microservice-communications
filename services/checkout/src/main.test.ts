import crypto from "node:crypto"
import Checkout from "./application/usecase/Checkout"
import CourseRepository from "./application/repository/CourseRepository"
import OrderRepository from "./application/repository/OrderRepository"
import { Course } from "./application/entities/Course"

test("Should do checkout", async () => {
  const mockCourse = new Course(crypto.randomUUID(), "Node.js", 1000)
  const orderRepository = jest.fn(() => ({
    save: jest.fn(),
    update: jest.fn(),
    get: jest.fn(),
  }))() as unknown as OrderRepository

  const courseRepository = jest.fn(() => ({
    get: jest.fn(() => mockCourse),
  }))() as unknown as CourseRepository

  const checkout = new Checkout(orderRepository, courseRepository)

  const input = {
    courseId: "e8db6ff5-f7e3-4ac3-8e52-b08a313a4a6f",
    name: "John Doe",
    email: "john.doe@gmail.com",
    cardToken: "123456789"
  }
  const output = await checkout.execute(input)

  expect(output.orderId).toBeDefined()
})