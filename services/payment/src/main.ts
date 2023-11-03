import express from 'express'
import cors from 'cors'
import { initQueueController } from "./queueController"

async function main() {
  await initQueueController()
  const app = express()
  app.use(express.json())
  app.use(cors())
  
  app.post('/process_payment', (req, res) => {
  
    const input = req.body
    console.log(input)
  
    return res.json({
      status: 'success',
      orderId: input.orderId
    })
  })
  
  const PORT = 3001
  app.listen(PORT, () => console.log('Running at: http://localhost:'+PORT))
}

main()