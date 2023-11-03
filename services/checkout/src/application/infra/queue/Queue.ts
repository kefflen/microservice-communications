
export default interface Queue {
  connect(): Promise<void>
  publish(queueName: string, data: any): Promise<void>
  close(): Promise<void>
  consume(queueName: string, callback: (data: any) => unknown): Promise<void>
}