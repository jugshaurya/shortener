const express = require('express')
const morgan  = require('morgan')
const { validateAndReturn } = require('./db/mapped_urls')
const app = express()

app.use(morgan('tiny'))
app.use(express.static(__dirname + '/public'))
app.use(express.json())

app.post('/api/short', (req, res) => {
  
  const pair = {
    url: req.body.url,
    name: req.body.name
  }

  validateAndReturn(pair)
    .then(result =>  {
      res.json(result)
    })
    .catch(err => {
      // console.log(err)
      res.status(500)
      res.json(err)
    })
})

const port = process.env.PORT || 8081
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

