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
  const body = new models.Elements(req.body)

  // res.status(200).json({
  //   model: body,
  //   insert: body.Events.insert(1)
  // })

  body.create()
    .then(() => res.status(200).json({ msg: 'success' }))
    .catch(error => res.status(400).json(error))
})

module.exports = router
