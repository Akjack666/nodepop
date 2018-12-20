'use strict';

const express = require('express');
const router = express.Router();

const Usuarios = require('../../models/Usuarios');
const jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

/**
 * POST /usuarios/login
 * Autentica un usuario
 */


 // http://localhost:3000/apiv1/usuarios/login

 router.post('/login', async (req, res, next) => {

    try{

    const email = req.body.email;
    const password = req.body.password;

    //buscamos el usuario

   const usuario = await Usuarios.findOne({ email: email}).exec()

   if(!usuario){
       res.json({succes: false, error: 'Invalid credentials'});
       return;
   }

   if(password !== usuario.password){
    res.json({succes: false, error: 'Invalid credentials'});
    return;
   }

   //crear un token

   jwt.sign({user_id: usuario._id}, '1234', {
       expiresIn: '2d'
   }, (err, token) => {
       if(err){
           next(err);
           return;
       }
       res.json({succes: true, result: token})
   })

}catch(err){
    next(err);
    return;
}
 })


 /**
  * POST /usuarios
  * crea un usuario en la base de datos
  * 
  */


  // http://localhost:3000/apiv1/usuarios/

  var BCRYPT_SALT_ROUNDS = 12;

 router.post('/', async (req, res, next) => {
    try{
      // recuperamos los datos del nuevo usuario

    const usuarioData = req.body;

    

    // creamos un usuario en memoria (objeto de tipo Usuario)

    const usuario = new Usuarios(usuarioData);

    //lo guardamos en bd

    await usuario.save();

    res.json({ success : true, result: usuario}); // se puede personalizar

  }catch(err){
      next(err);
      return;
  }

})


module.exports = router;