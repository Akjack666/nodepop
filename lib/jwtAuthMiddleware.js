'use strict'

const jwt = require('jsonwebtoken');
require('dotenv').config();

//funcion que crea un middleware de autentificacion jwt

module.exports = () => {

    return (req, res, next) => {

        // recogemos el token
        const token = req.body.jwttoken || req.query.jwttoken || req.get('x-access-token');

        if(!token){
            const err = new Error('No token provider');
            err.status = 401;
            next(err);
            return;
        }

        //Verificamos el token

        jwt.verify(token, process.env.JWT_SECRET,(err, tokenDescodificado) => {
            if(err){
                next(new Error('Invalid token'))
                return;
            }
            req.user_id = tokenDescodificado.user_id;
            next();
        })
    };
}

