'use strict';

const express = require('express');
const router = express.Router();



const Anuncio = require('../../models/Anuncio');

/**
 * 
 * GET /anuncios
 * obtener una lista de anuncios
 */

 router.get('/', (req,res,next) => {
     Anuncio.find().exec((err, lista) => {

        if(err){
            next (err);
            return;
        }

        res.json({ success: true, results: lista});
        console.log(lista);
     });


   

 });


 module.exports = router;