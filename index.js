const express = require('express')
const app = express()
require('dotenv').config()
const cors=require('cors')
const port = process.env.PORT


app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
  res.send('server is runing')
})

app.listen(port, () => {
  console.log(`Server is runing on port ${port}`)
})
