const { DataTypes: dt } = require('sequelize');
const db = require('../config/sequelize.config.js')

const Bootcamp = db.define('bootcamp', {
    title: {
        type: dt.STRING,
        allowNull: false
    },
    cue: {
        type: dt.INTEGER,
        allowNull: false,
        default: 1,
    },
    description: {
        type: dt.STRING,
        allowNull: false
    }
}, { timestamps: true});


module.exports = Bootcamp;