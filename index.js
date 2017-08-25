const db = require('./db')
const express = require('express')
const app = express()
const routes = require('./routes')

app.use('/elements', routes.elements)

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'API is listening' })
})

const port = 3000

app.listen(port, () => {
  console.log('API listening on port ' + port + ' NODE_ENV=' + process.env.NODE_ENV)
})
