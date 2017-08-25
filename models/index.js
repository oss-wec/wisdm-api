const fs = require('fs')
const path = require('path')

fs.readdirSync('./models')
  .forEach(file => {
    let fileName = path.parse(file).name
    fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1)

    if (fileName !== 'Index') {
      console.log(fileName)
      exports[fileName] = require(path.join(__dirname, file))
    }
  })

module.exports = exports
