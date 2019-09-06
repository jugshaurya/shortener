const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('tiny'))
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({
  extended: true
})) // for JS Gracefull Fallback
app.use(express.json())

const {
  validateAndReturn,
  findAndReturn
} = require('./db/mapped_urls')

app.get('/s/:name', (req, res) => {
  findAndReturn(req.params.name)
    .then(pair => {
      res.redirect(`${pair.url}`)
    })
    .catch(err => {
      res.redirect(`/error.html?msg=${err}`)
    })
})

app.post('/api/short', (req, res) => {
  const pair = {
    url: req.body.url,
    name: req.body.name
  }

  validateAndReturn(pair)
    .then(result => {
      res.json({
        url: result.ops[0].url,
        name: result.ops[0].name
      })
    })
    .catch(err => {
      res.status(500)
      res.json(err)
    })
})

const port = process.env.PORT || 8081
app.listen(port, () => {})