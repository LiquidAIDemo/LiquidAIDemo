const express = require('express')
const cors = require("cors")
const app = express()

app.use(cors())

app.get('/', (request, response) => {  
  response.send('<h1>hello world</h1>')
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})