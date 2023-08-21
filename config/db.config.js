const Sequelize = require('sequelize');

const db = new Sequelize('db_bootcamp', 'postgres', 'morocha', {
    host: 'localhost',
    dialect: 'postgres'
});

async function syncDB(){
    try {
        await db.authenticate();
        console.log('Connections has been established suddessfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

syncDB();

module.exports = db;