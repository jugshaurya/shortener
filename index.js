const express = require('express')
const morgan  = require('morgan')

const app = express()

app.use(morgan('tiny'))
app.use(express.static(__dirname + '/public'))


const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Listening on port ${port} `)
})

