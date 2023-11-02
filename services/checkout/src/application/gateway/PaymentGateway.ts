export default interface PaymentGateway {
  processPayment(payment: processPaymentInput): Promise<processPaymentOutput>
}

export type processPaymentInput = {
  orderId: string
  amount: number
  creditCard: string
}

export type processPaymentOutput = {
  orderId: string
  status: 'success' | 'fail'
}