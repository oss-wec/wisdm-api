const Express = require('express')
const router = Express.Router()
const db = require('../db')
const models = require('../models')

router.get('/', (req, res) => {
  // console.log(Object.getOwnPropertyNames(db.elements.attr))
  console.log(models.Element)

  // db.elements.all()
  models.Element.all()
    .then(data => res.status(200).json({
      data: data,
      cs: db.elements.cs
    }))
    .catch(error => res.status(400).json(error))
})

router.post('/', (req, res) => {
  db.elements.insert({
    animal_id: 1601,
    species_id: 50
  })
    .then(data => res.status(200).json(data))
    .catch(error => res.status(400).json(error))
})

module.exports = router
