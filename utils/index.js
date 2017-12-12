const name = require('pg-promise').as.name
const helpers = require('pg-promise')().helpers
const humps = require('humps')
const format = require('pg-promise').as.format
const sql = require('../db/sql')

const upsert = (ctx, conflict, id) => {
  if (!ctx) return ''
  ctx.map(m => { m[Object.keys(id)[0]] = id[Object.keys(id)[0]] })

  return helpers.insert(ctx, ctx[0].cs()) +
    ' ON CONFLICT ON CONSTRAINT ' + conflict + ' DO UPDATE SET ' +
    ctx[0].cs().columns.map(m => {
      let col = m.escapedName
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
  console.log(structure.toJSON())
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

const eventInsert = (ctx, ids) => {
  const tables = ['Biometrics', 'Injuries', 'Medications', 'Samples', 'LabIds', 'Vitals']
  const arrInsert = []

  tables.forEach(i => {
    let data = ctx.Event[i]

    if (data) {
      arrInsert.push(format(sql.general.insert, batchInsert(data, ids.eventId)))
    }
  })

  if (ctx.Marks) arrInsert.push(upsert(ctx.Marks, 'unq_mark_constraint', { element_id: ids.elementId }))
  if (ctx.Devices) arrInsert.push(upsert(ctx.Devices, 'unq_deployment_constraint', { element_id: ids.elementId }))
  if (ctx.Event.Mortality) arrInsert.push(ctx.Event.Mortality.pg().insert(ids.eventId))
  if (ctx.Event.Necropsy) arrInsert.push(ctx.Event.Necropsy.pg().insert(ids.eventId))
  arrInsert.push('SELECT species.common_name, elements.animal_id FROM elements INNER JOIN species ON elements.species_id = species.id LIMIT 1')

  return helpers.concat(arrInsert)
}

module.exports = {
  upsert,
  pick,
  mapInsert,
  validate,
  arrayInsert,
  batchInsert,
  pg,
  eventInsert
}
