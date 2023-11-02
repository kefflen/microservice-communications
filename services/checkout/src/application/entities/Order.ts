import crypto from "node:crypto"

export default class Order {
  constructor(
    readonly orderId: string,
    readonly courseId: string,
    readonly name: string,
    readonly email: string,
    readonly amount: number,
    readonly status: string
  ) {}

  static create(name: string, email: string, courseId: string, amount: number) {
    const orderId = crypto.randomUUID()
    const status = "waiting_payment"

    return new Order(orderId, courseId, name, email, amount, status)
  }
}