import Queue from "./Queue"
import amqp from 'amqplib'

export default class RabbitMQAdapter implements Queue {
  connection: any

  async connect(): Promise<void> {
    this.connection = await amqp.connect('amqp://localhost')
  }

  async close() {
    await this.connection.close()
  }

  async publish(queueName: string, data: any): Promise<void> {
    const channel = await this.connection.createChannel()

    await channel.assertQueue(queueName, {
      durable: true,
    })

    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)))
  }

  async consume(queueName: string, callback: (data: any) => unknown): Promise<void> {
    const channel = await this.connection.createChannel()

    await channel.assertQueue(queueName, {
      durable: true,
    })

    channel.consume(queueName, async (message: any) => {
      const data = JSON.parse(message.content.toString())

      await callback(data)

      channel.ack(message)
    })
  }
}