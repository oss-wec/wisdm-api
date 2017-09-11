const Express = require('express')
const router = Express.Router()
// const db = require('../db')
const models = require('../models')

router.get('/', (req, res) => {
  models.Projects.all()
    .then(data => res.status(200).json({
      msg: 'success',
      data
    }))
    .catch(error => res.status(400).json({ error }))
})

router.post('/', (req, res) => {
  console.log(req.body)
  const project = new models.Projects(req.body)

  project.create()
    .then(data => res.status(200).json({ msg: 'successful', data }))
    .catch(error => res.status(400).json({ error }))
})

module.exports = router
