import express from 'express'

const app = express()
app.use(express.json())

app.post('process_payment', (req, res) => {

  console.log(req.body)
  return res.json({
    status: 'success',
  })
})

const PORT = 3001
app.listen(PORT, () => console.log('Running at: http://localhost:'+PORT))