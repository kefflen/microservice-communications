import RabbitMQAdapter from "./queue/RabbitMQAdapter"


export const initQueueController = async () => {
  const queue = new RabbitMQAdapter()
  await queue.connect()

  queue.consume('orderPlaced', (input) => {
    console.log({ input })
  })
}