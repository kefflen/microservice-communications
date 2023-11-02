import crypto from "node:crypto"
import Checkout from "./application/usecase/Checkout"
import { Course } from "./application/entities/Course"
import prismaClient from "./application/infra/database/prismaClient"
import OrderRepositoryDatabase from "./application/infra/repository/OrderRepositoryDatabase"
import { CourseRepositoryDatabase } from "./application/infra/repository/CourseRepositoryDatabase"
import GetOrder from "./application/usecase/GetOrder"
import PaymentGatewayHttp from "./application/infra/gateway/PaymentGatewayHttp"

let courseMock: Course
const courseId = crypto.randomUUID()
beforeAll(async () => {
  await prismaClient.course.create({
    data: {
      courseId,
      name: "Node.js",
      amount: 1000
    }
  })
  courseMock = new Course(crypto.randomUUID(), "Node.js", 1000)
})

test("Should do checkout", async () => {

  // const orderRepository = jest.fn(() => ({
  //   save: jest.fn(),
  //   update: jest.fn(),
  //   get: jest.fn(),
  // }))() as unknown as OrderRepository

  // const courseRepository = jest.fn(() => ({
  //   get: jest.fn(() => courseMock),
  // }))() as unknown as CourseRepository

  const orderRepository = new OrderRepositoryDatabase()
  const courseRepository = new CourseRepositoryDatabase()
  const paymentGateway = new PaymentGatewayHttp()
  const checkout = new Checkout(orderRepository, courseRepository, paymentGateway)

  const input = {
    courseId,
    name: "John Doe",
    email: "john.doe@gmail.com",
    cardToken: "123456789"
  }
  const output = await checkout.execute(input)

  expect(output.orderId).toBeDefined()

  const getOrder = new GetOrder(orderRepository)

  const outputGetOrder = await getOrder.execute(output.orderId)

  expect(outputGetOrder).toEqual({
    ...outputGetOrder,
    status: "confirmed",
    orderId: expect.any(String)
  })
})

afterEach(async () => {
  await prismaClient.order.deleteMany({where: {}})
  await prismaClient.course.deleteMany({where: {}})
})

afterAll(async () => {
  await prismaClient.$disconnect()
})