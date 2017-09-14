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
    biometrics: format(sql.general.insert, utils.batchInsert(body.Event.Biometrics, 222)),
    injuries: format(sql.general.insert, utils.batchInsert(body.Event.Injuries, 222)),
    medications: format(sql.general.insert, utils.batchInsert(body.Event.Medications, 222)),
    samples: format(sql.general.insert, utils.batchInsert(body.Event.Samples, 222)),
    labIds: format(sql.general.insert, utils.batchInsert(body.Event.LabIds, 222)), // TODO: upsert labids
    vitals: format(sql.general.insert, utils.batchInsert(body.Event.Vitals, 222)),
    necropsy: body.Event.Necropsy.pg().insert(222),
    mortality: body.Event.Mortality.pg().insert(222)
  })

  // body.create()
  //   .then(() => res.status(200).json({ msg: 'success' }))
  //   .catch(error => res.status(400).json(error))
})

module.exports = router
