const fs = require('fs')
const path = require('path')

fs.readdirSync('./routes')
  .forEach(file => {
    let fileName = path.parse(file).name

    if (fileName !== 'index') {
      exports[fileName] = require(path.join(__dirname, file))
    }
  })

module.exports = exports
