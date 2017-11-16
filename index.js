// const db = require('./db')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')

process.env.TZ = 'UTC'

app.use(cors())
app.use(bodyParser.json())

app.use('/elements', routes.elements)
app.use('/projects', routes.projects)
app.use('/users', routes.users)
app.use('/species', routes.species)

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'API is listening' })
})

const port = 3000

app.listen(port, () => {
  console.log('API listening on port ' + port + ' NODE_ENV=' + process.env.NODE_ENV + ' : TZ - ' + process.env.TZ)
  // console.log('API listening on port ' + port + ' NODE_ENV=' + process.env.NODE_ENV)
})
