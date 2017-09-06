'use strict'

const promise = require('bluebird')
const repos = {
  elements: require('./repos/elements'),
  projects: require('./repos/projects'),
  general: require('./repos/general')
}

const initOptions = {
  promiseLib: promise,
  extend: (obj, dc) => {
    for (let r in repos) {
      obj[r] = new repos[r](obj, pgp)
    }
  }
}

const config = {
  host: 'localhost',
  port: 5432,
  database: 'wisdm',
  user: null,
  password: null
}

const pgp = require('pg-promise')(initOptions)
const db = pgp(config)
const diagnostics = require('./diagnostics')

diagnostics.init(initOptions)

module.exports = db
