const humps = require('humps')
// export function sqlUpsert (data, cs, conflict) {
//   return helpers.insert(data, cs) +
//   ' ON CONFLICT (' + conflict + ') DO UPDATE SET' +
//   cs.columns.map(x => {
//     let col = name(x.name)
//     return col + '= EXCLUDED.' + col
//   }).join()
// }

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

module.exports = {
  pick,
  mapInsert
}
