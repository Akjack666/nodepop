'use strict';

const express = require('express');
const router = express.Router();

const Usuarios = require('../../models/Usuarios');
const jwt = require('jsonwebtoken');

/**
 * POST /usuarios/login
 * Autentica un usuario
 */

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


module.exports = router;