const express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')

const {setupHandler} = require('./handler/routes.js')

const app = express()
const port = 3000



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Hello Pikachu!'
  })
})

app.use('/', setupHandler(router))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})