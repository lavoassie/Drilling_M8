const express = require('express');
const router = express.Router();
const User = require('../models/users.model.js')

router.get('/api/users', async function (req,res){
    //Aquí vamos a devolver los usuarios
    const users = await User.findAll() 
    return res.json(users)
})


module.exports = router;