import OrderRepository from "../repository/OrderRepository"

export default class GetOrder {
  constructor(
      private readonly orderRepository: OrderRepository
  ) { }
  
  async execute(input: string): Promise<output> {
    const order = await this.orderRepository.get(input)

    return {
      orderId: order.orderId,
      name: order.name,
      email: order.email,
      amount: order.amount,
      status: order.status
    }
  }
}

type output = {
  orderId: string
  name: string
  email: string
  amount: number
  status: string
}