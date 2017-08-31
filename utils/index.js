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

module.exports = {
  pick
}
