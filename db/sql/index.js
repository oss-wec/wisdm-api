'use strict'

const QueryFile = require('pg-promise').QueryFile
const path = require('path')

// sql helper function
const sql = file => {
  const fullPath = path.join(__dirname, file)

  const options = {
    minify: true
  }

  const qf = new QueryFile(fullPath, options)

  if (qf.error) {
    console.log(qf.error)
  }

  return qf
}

module.exports = {
  elements: {
    all: sql('elements/all.sql')
  }
}
