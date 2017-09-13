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

const arrayInsert = (arr, id) => {
  return {
    values: arr
      .map(m => m.values(id))
      .reduce((acc, cur) => `${acc}, ${cur}`),
    columns: arr[0].cs().columns.map(m => m.name),
    table: arr[0].cs().table.table
  }
}

const batchInsert = (arr, id) => {
  return {
    values: arr.map(m => m.pg().values(id)).reduce((acc, cur) => `${acc}, ${cur}`),
    columns: arr[0].pg().cs.columns.map(m => m.name),
    table: arr[0].pg().cs.table.table
  }
}

const pg = (ctx, table) => {
  let cs = new helpers.ColumnSet(ctx.attributes, { table: table })
  // FIXME: event_id needs to be ignored in sets and insert

  return {
    cs,
    sets: () => helpers.sets(ctx, cs),
    values: (id) => {
      ctx.event_id = id
      return helpers.values(ctx, cs)
    },
    insert: (id) => {
      ctx.event_id = id
      return helpers.insert(ctx, cs)
    }
  }
}

module.exports = {
  upsert,
  pick,
  mapInsert,
  validate,
  arrayInsert,
  batchInsert,
  pg
}
