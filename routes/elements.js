const Express = require('express')
const router = Express.Router()
const db = require('../db')
const models = require('../models')
const validate = require('../utils').validate
// const utils = require('../utils')
// const format = require('pg-promise').as.format
// const sql = require('../db/sql')

router.get('/', (req, res) => {
  models.Elements.all()
    .then(data => res.status(200).json({
      msg: 'success',
      data: data
    }))
    .catch(error => res.status(400).json(error))
})

router.get('/:id', (req, res) => {
  models.Elements.findById(req.params.id)
    .then(data => res.status(200).json({ data }))
    .catch(error => res.status(400).json(error))
})

router.post('/', (req, res) => {
  const encounter = new models.Elements(req.body)

  validate(encounter)
    .then(encounter => encounter.create())
    .then(data => res.status(200).json({ msg: 'success', data }))
    .catch(error => res.status(400).json(error))
})

module.exports = router
