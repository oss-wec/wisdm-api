const { attributes } = require('structure')
const db = require('../db')
const helpers = db.general.pgp.helpers

const Users = attributes({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  agency: {
    type: String,
    required: true
  }
})(class Users {
  static all () {
    return db.manyOrNone('SELECT * FROM users')
  }

  cs () {
    return new helpers.ColumnSet(this.attributes, { table: 'users' })
  }

  sets () {
    return helpers.sets(this.attributes, this.cs())
  }

  values () {
    return helpers.values(this.attributes, this.cs())
  }

  insert () {
    return helpers.insert(this.attributes, this.cs()) + ' RETURNING *'
  }

  create () {
    return db.oneOrNone(this.insert())
  }
})

module.exports = Users
