const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const bcrypt = require('bcrypt')

const {verifyToken} = require('../middleware/auth.js')
const User = require('../models/users.model.js')


const users = [
  {id: 1, nombre: 'Carlos Salvo', email: 'csalvo@gmail.com', pass: 'abc123'},
  {id: 1, nombre: 'Paola Brito', email: 'pbrito@gmail.com', pass: '1234'},
  {id: 1, nombre: 'Diego Pinto', email: 'dpinto@gmail.com', pass: '1111'}
]

/* Para crear un JWT. */
router.post('/login', async function(req, res, next) {

  // 1. Recibo los parámetros del formulario
  const {email, password} = req.body

  // 2. Verificamos que el usuario exista en la "BBDD"
  const user = await User.findOne({where: {email}})
  if (!user) {
    return res.status(404).json({err: 'Usuario inexistente'})
  }

  // 3. Verificamos que la contraseña sea la correcta
  const son_iguales = await bcrypt.compare(password, user.password)
  if (!son_iguales) {
    return res.status(400).json({err: 'Contraseña incorrecta'})
  }

  // 3. Calculo 1 hora más
  const una_hora = Math.floor(new Date()/1000) + 3600

  // 4. Creo el token
  const token = jwt.sign({
    exp: una_hora,
    data: {
      id: user.id,
      email: user.email,
      nombre: user.nombre
    }
  }, process.env.SECRET_KEY)

  // 4. Le retorno el token al cliente
  res.json(token);
});

/* Para crear un JWT. */
router.post('/signup', async function(req, res, next) {

  // 1. Recibo los parámetros del formulario
  const {firstname, lastname, email, password} = req.body
    console.log(firstname, lastname);
  // 2. Verificamos que los 4 campos existan
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({
      err: 'Debe ingresar todos los campos'
    })
  }

  // 4. Verficamos si ese "email" no exista en la base de datos
  const oldUser = await User.findOne({where: {email}})
  if (oldUser) {
    return res.status(400).json({
      err: 'Ese email ya se encuentra registrado'
    })
  }
  
  // 5. Creamos el usuario en la base de datos
  let newUser;
  try {
    const password_encrypt = await bcrypt.hash(password, 10)
    console.log(password_encrypt)
    newUser = await User.create({firstname, lastname, email, password: password_encrypt})
  }
  catch(error) {
    return res.status(400).json(error)
  }

  // 6. Genero el nuevo token, y se lo envío al usuario
  const una_hora = Math.floor(new Date()/1000) + 3600

  const token = jwt.sign({
    exp: una_hora,
    data: {
      id: newUser.id,
      email,
      firstname
    }
  }, process.env.SECRET_KEY)

  // 4. Le retorno el token al cliente
  res.json({Mensaje: 'Usuario creado correctamente', newUser, Token: token});
});

/* Para leer un JWT */
router.post('/read', function (req, res) {
  const {token} = req.body

  let decoded;
  try {
    decoded = jwt.verify(token, llave_secreta)
  }
  catch(error) {
    return res.status(400).json(error)
  }
  res.json(decoded)
})

// Ruta que está protegida por nuestro middleware llamado "auth_required"
router.get('/my', verifyToken, (req, res) => {

  // Info que viene desde el middleware
  const data = req.data
  console.log(data)
  
  // 3. Si todo está ok, devolvemos el dinero
  res.json(data)
})


module.exports = router;