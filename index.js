const express = require('express')
const morgan  = require('morgan')
const { validateAndReturn } = require('./db/mapped_urls')
const app = express()

app.use(morgan('tiny'))
app.use(express.static(__dirname + '/public'))
app.use(express.json())

app.post('/api/short', (req, res) => {
  console.log(req.body)

  const pair = {
    url: req.body.url,
    name: req.body.url
  }

  validateAndReturn(pair)
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Listening on port ${port} `)
})

