const userController = require('../controllers/user.controller');
const bootcampController = require('../controllers/bootcamp.controller');

async function createUsers() {
    await userController.createUser('Mateo', 'Díaz', 'mateo.diaz@correo.com');
    await userController.createUser('Santiago', 'Mejías', 'santiago.mejias@correo.com');
    await userController.createUser('Lucas', 'Rojas', 'lucas.rojas@correo.com');
    await userController.createUser('Facundo', 'Fernandez', 'facundo.fernandez@correo.com');
};

async function createBootcamps() {
    await bootcampController.createBootcamp('Introduciendo El Bootcamp De React.', 10, 'React es la librería más usada en JavaScript para el desarrollo de interfaces.');
    await bootcampController.createBootcamp('Bootcamp Desarrollo Web Full Stack.', 12, 'Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS.');
    await bootcampController.createBootcamp('Bootcamp Big Data, Inteligencia Artificial & Machine Learning.', 18, 'Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning.');
};

async function addUser() {
    await bootcampController.addUser(1, 1);
    await bootcampController.addUser(1, 2);
    await bootcampController.addUser(2, 1);
    await bootcampController.addUser(3, 1);
    await bootcampController.addUser(3, 2);
    await bootcampController.addUser(3, 3);
};

async function insertData () {
    await createUsers();
    await createBootcamps();
    await addUser();
};

async function queriesDrilling() {
    console.log('Consultando el Bootcamp por id, incluyendo los usuarios');
    await bootcampController.findById(2);
    
    console.log('Listar todos los Bootcamp con sus usuarios.');
    await bootcampController.findAll();
    
    console.log('Consultar un usuario por id, incluyendo los Bootcamp.');
    await userController.findUserById(3);
    
    console.log('Listar los usuarios con sus Bootcamp.');
    await userController.findAll();
    
    console.log('Actualizar el usuario según su id; por ejemplo: actualizar el usuario con id=1 por Pedro Sánchez.');
    await userController.updateUserById(1, 'Amy Sánchez');
    
    console.log('Eliminar un usuario por id; por ejemplo: el usuario con id=1.');
    await userController.deleteUserById(1);
};

module.exports = { insertData, queriesDrilling };