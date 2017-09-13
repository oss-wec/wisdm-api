const Express = require('express')
const router = Express.Router()
const db = require('../db')
const models = require('../models')
const utils = require('../utils')
const format = require('pg-promise').as.format
const sql = require('../db/sql')

router.get('/', (req, res) => {
  models.Element.all()
    .then(data => res.status(200).json({
      data: data,
      cs: db.elements.cs
    }))
    .catch(error => res.status(400).json(error))
})

router.post('/', (req, res) => {
  // console.log(req.body)
  const body = new models.Elements(req.body)

  res.status(200).json({
    model: body,
    biometrics: format(sql.general.insert, utils.arrayInsert(body.Event.Biometrics, 12))
  })

  // body.create()
  //   .then(() => res.status(200).json({ msg: 'success' }))
  //   .catch(error => res.status(400).json(error))
})

module.exports = router
