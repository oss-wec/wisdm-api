const Express = require('express')
const router = Express.Router()
const db = require('../db')
const models = require('../models')

router.get('/', (req, res) => {
  models.Element.all()
    .then(data => res.status(200).json({
      data: data,
      cs: db.elements.cs
    }))
    .catch(error => res.status(400).json(error))
})

router.post('/', (req, res) => {
  const body = new models.Devices(req.body)

  res.status(200).json({
    model: body,
    cs: body.cs(),
    sets: body.sets(),
    values: body.values(),
    insert: body.insert()
  })

  // db.elements.insert({
  //   animal_id: 1601,
  //   species_id: 50
  // })
  //   .then(data => res.status(200).json(data))
  //   .catch(error => res.status(400).json(error))
})

module.exports = router
