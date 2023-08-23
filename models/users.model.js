const { DataTypes: dt } = require('sequelize')
const Sequelize = require('sequelize');
const db = require('../config/sequelize.config.js')

const User = db.define('user', {
  firstname: {
    type: dt.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 45],
        msg: 'El largo del nombre debe medir entre 2 y 45 caracteres'
      }
    }
  },
  lastname: {
    type: dt.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 45],
        msg: 'El largo del nombre debe medir entre 2 y 45 caracteres'
      }
    }
  },
  email: {
    type: dt.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: {
        args: [true],
        msg: "Debe ingresar un correo válido"   
      }
    }
  },
  password: {
    type: dt.STRING,
    allowNull: false,
  },
}, {timestamps: true})

module.exports = User