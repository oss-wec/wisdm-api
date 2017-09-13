const { attributes } = require('structure')
const db = require('../db')
const utils = require('../utils')
const helpers = require('pg-promise')().helpers
const format = require('pg-promise').as.format

const Elements = attributes({
  id: {
    type: Number,
    integer: true
  },
  animal_id: {
    type: Number,
    integer: true,
    required: true
  },
  species_id: {
    type: Number,
    integer: true,
    required: true
  },
  sex: {
    type: String,
    required: true,
    equal: ['male', 'female', 'unk'],
    default: 'unk'
  },
  Marks: {
    type: Array,
    itemType: 'Marks'
  },
  Devices: {
    type: Array,
    itemType: 'Devices'
  },
  Events: {
    type: 'Events'
  }
}, {
  dynamics: {
    Marks: () => require('./marks'),
    Devices: () => require('./devices'),
    Events: () => require('./events')
  }
})(class Element {
  static all () {
    return db.elements.all()
  }

  base () {
    return utils.pick(this, 'animal_id', 'species_id', 'sex')
  }

  cs () {
    return new helpers.ColumnSet(this.base(), { table: 'elements' })
  }

  sets () {
    return helpers.sets(this.base(), this.cs())
  }

  values () {
    return helpers.values(this.base(), this.cs())
  }

  insert () {
    let sql = `
      WITH ins AS (
      INSERT INTO elements (animal_id, species_id, sex)
      VALUES ($/animal_id/, $/species_id/, $/sex/)
      ON CONFLICT(animal_id) DO UPDATE
      SET animal_id = elements.animal_id WHERE FALSE
      RETURNING elements.id
      )
      SELECT id FROM ins
      UNION ALL
      SELECT id FROM elements
      WHERE animal_id = $/animal_id/
      LIMIT 1;
    `
    return format(sql, this)
    // return helpers.insert(this.base(), this.cs()) + ' RETURNING *'
  }

  create () {
    return db.tx(t => {
      return t.one(this.insert())
        .then(element => {
          return t.one(this.Events.insert(element.id))
            .then(encounter => {
              if (!this.Marks && !this.Devices) return encounter

              let ids = { elementId: element.id, eventId: encounter.id }

              let sql = helpers.concat([
                utils.upsert(this.Marks, 'unq_mark_constraint', { element_id: ids.elementId }),
                utils.upsert(this.Devices, 'unq_deployment_constraint', { element_id: ids.elementId })
              ])

              return t.none(sql)
            })
        })
    })
  }
})

module.exports = Elements
