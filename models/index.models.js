//Archivo para relacionar User y Bootcamp
const { Sequelize } = require('sequelize')
const User = require('./users.model.js');
const Bootcamp = require('./bootcamp.model.js');
const db = require('../config/sequelize.config.js')


User.belongsToMany(Bootcamp, 
    {through: 'UserBootcamp', as: 'bootcamps'});
Bootcamp.belongsToMany(User, 
    {through: 'UserBootcamp', as: 'users'});

try {
    db.sync();
    console.log('Se ha sincronizado con la Base de Datos');
} catch(err) {
    console.log('No se pudo sincronizar con la Base de Datos', err);
};

module.exports = { User, Bootcamp };