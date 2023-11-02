import Order from "../entities/Order"
import CourseRepository from "../repository/CourseRepository"
import OrderRepository from "../repository/OrderRepository"

export default class Checkout {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly courseRepository: CourseRepository
  ) {}

  async execute(input: input): Promise<output> {
    const course = await this.courseRepository.get(input.courseId)
    const order = Order.create(input.name, input.email, course.courseId, course.amount)

    await this.orderRepository.save(order)

    return {
      orderId: order.orderId,
    }
  }
}

type input = {
  courseId: string
  name: string
  email: string
  cardToken: string
}

type output = {
  orderId: string
}