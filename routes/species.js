const Express = require('express')
const router = Express.Router()
const models = require('../models')

router.get('/', (req, res) => {
  models.Species.all()
    .then(data => res.status(200).json({ msg: 'success', data }))
    .catch(error => res.status(400).json({ error }))
})

module.exports = router
