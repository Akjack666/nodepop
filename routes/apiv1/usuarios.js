'use strict';

const express = require('express');
const router = express.Router();

const Usuarios = require('../../models/Usuarios');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const saltRounds = 10;


/**
 * POST /usuarios/login
 * Autentica un usuario
 */


// http://localhost:3000/apiv1/usuarios/login

router.post('/login', async (req, res, next) => {

    try {

        const email = req.body.email;
        const password = req.body.clave;




        //buscamos el usuario

        const usuario = await Usuarios.findOne({ email: email }).exec()
        console.log(usuario)

        if (!usuario.email) {
            res.json({ succes: false, error: res.__('invalid') });
            return;
        }

        bcrypt.compare(usuario.clave, password, function (err, res) {
            // res == true

            if (res) {
                if (password !== usuario.clave) {
                    res.json({ succes: false, error: res.__('invalid') });
                    return;
                }
            }

        });



        //crear un token

        jwt.sign({ user_id: usuario._id }, process.env.JWT_SECRET, {
            expiresIn: '2d'
        }, (err, token) => {
            if (err) {
                next(err);
                return;
            }
            res.json({ succes: true, result: token })
        })

    } catch (err) {
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



router.post('/', async (req, res, next) => {
    try {
        // recuperamos los datos del nuevo usuario

        const usuarioData = req.body;

        console.log(usuarioData);



        await bcrypt.hash(req.body.clave, saltRounds, function (err, hash) {
            // Store hash in your password DB.
            console.log(hash);


            // creamos un usuario en memoria (objeto de tipo Usuario)

            const usuario = new Usuarios(usuarioData);

            usuario.clave = hash;

            //lo guardamos en bd

            usuario.save();

            res.json({ success: true, result: usuario }); // se puede personalizar


        });





    } catch (err) {
        next(err);
        return;
    }

})


module.exports = router;