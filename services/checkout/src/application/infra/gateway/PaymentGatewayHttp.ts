import axios from "axios"
import PaymentGateway, { processPaymentInput, processPaymentOutput } from "../../gateway/PaymentGateway"

export default class PaymentGatewayHttp implements PaymentGateway{
  async processPayment(payment: processPaymentInput): Promise<processPaymentOutput> {
    const { data } = await axios.post('http://localhost:3001/process_payment', payment)

    return data
  }
}