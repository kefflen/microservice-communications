import Order from "../entities/Order"
import PaymentGateway, { processPaymentInput } from "../gateway/PaymentGateway"
import Queue from "../infra/queue/Queue"
import CourseRepository from "../repository/CourseRepository"
import OrderRepository from "../repository/OrderRepository"

export default class Checkout {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly courseRepository: CourseRepository,
    private readonly paymentGateway: PaymentGateway,
    private readonly queue: Queue
  ) {}

  async execute(input: input): Promise<output> {
    const course = await this.courseRepository.get(input.courseId)
    const order = Order.create(input.name, input.email, course.courseId, course.amount)

    await this.orderRepository.save(order)

    // const processPaymentInput: processPaymentInput = {
    //   orderId: order.orderId,
    //   amount: order.amount,
    //   creditCard: input.cardToken,
    // }

    // const processPaymentOutput = await this.paymentGateway.processPayment(processPaymentInput)

    // if (processPaymentOutput.status === 'success') {
    //   order.consfirmPayment()
    //   await this.orderRepository.update(order)
    // }

    const orderPlacedEvent = {
      orderId: order.orderId,
      amount: order.amount,
      creditCard: input.cardToken,
    }
    
    await this.queue.publish('orderPlaced', orderPlacedEvent)

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