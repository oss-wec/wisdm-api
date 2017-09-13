const name = require('pg-promise').as.name
const helpers = require('pg-promise')().helpers
const humps = require('humps')

const upsert = (ctx, conflict, id) => {
  if (!ctx) return ''
  ctx.map(m => { m[Object.keys(id)[0]] = id[Object.keys(id)[0]] })

  return helpers.insert(ctx, ctx[0].cs()) +
    ' ON CONFLICT ON CONSTRAINT ' + conflict + ' DO UPDATE SET ' +
    ctx[0].cs().columns.map(m => {
      let col = name(m.name)
      return col + '= EXCLUDED.' + col
    }).join()
}

const pick = (o, ...props) => {
  return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})))
}

const mapInsert = (ctx, ctxKey, id) => {
  const insertObj = {}

  insertObj.values = ctx[ctxKey]
    .map(i => {
      i.project_id = id
      return i.values()
    })
    .reduce((prev, curr) => prev + ', ' + curr)
  insertObj.columns = Object.keys(ctx[ctxKey][0].base())
  insertObj.table = humps.decamelize(ctxKey)
}

const validate = (structure) => {
  console.log(structure)
  return new Promise((resolve, reject) => {
    const { valid, errors } = structure.validate()
    if (!valid) {
      console.log(errors)
      reject(errors)
    } else {
      resolve(structure)
    }
  })
}

module.exports = {
  upsert,
  pick,
  mapInsert,
  validate
}
