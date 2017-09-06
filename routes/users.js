const Express = require('express')
const router = Express.Router()
const db = require('../db')
const models = require('../models')

router.post('/', (req, res) => {
  const user = new models.Users(req.body)

  // res.status(200).json({
  //   attributes: user.attributes,
  //   cs: user.cs(),
  //   sets: user.sets(),
  //   values: user.values(),
  //   insert: user.insert()
  // })

  user.create()
    .then(data => res.status(200).json({ msg: 'successful', data }))
    .catch(err => res.status(400).json({ err }))
})

module.exports = router
