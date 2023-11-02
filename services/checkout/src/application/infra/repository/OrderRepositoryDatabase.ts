import Order from "../../entities/Order"
import OrderRepository from "../../repository/OrderRepository"
import prismaClient from "../database/prismaClient"

export default class OrderRepositoryDatabase implements OrderRepository {
  async save(order: Order): Promise<void> {
    await prismaClient.order.create({
      data: {
        orderId: order.orderId,
        name: order.name,
        email: order.email,
        courseId: order.courseId,
        amount: order.amount,
        status: order.getStatus(),
      },
    })
  }

  async update(order: Order): Promise<void> {
    await prismaClient.order.update({
      data: {
        name: order.name,
        email: order.email,
        courseId: order.courseId,
        amount: order.amount,
        status: order.getStatus(),
      },
      where: {
        orderId: order.orderId,
      }
    })
  }

  async get(orderId: string): Promise<Order> {
    const orderData = await prismaClient.order.findUnique({
      where: {
        orderId,
      }
    })

    if (!orderData) throw Error("Order not found")

    return new Order(orderData.orderId, orderData.courseId, orderData.name, orderData.email, Number(orderData.amount), orderData.status)
  }

}