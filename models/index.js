const User = require('./users.model.js');
const Bootcamp = require('./bootcamp.model.js');
const db = require('../config/db.config.js');
const { insertData } = require('../utils/utils.js');

User.belongsToMany(Bootcamp, {
    through: 'user_bootcamp',
    as: 'bootcamps',
    foreignKey: 'user_id'
});

Bootcamp.belongsToMany(User, {
    through: 'user_bootcamp',
    as: 'users',
    foreignKey: 'bootcamp_id'
});

async function run() {
    try {
        await db.sync({force: true});
        await insertData();
    } catch (error) {
        console.error('Something went wrong with the SYNC of the table User', error);
    };
};

module.exports = run;