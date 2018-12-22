'use strict';

const express = require('express');
const router = express.Router();



const Anuncio = require('../../models/Anuncio');
const jwtAuthMiddleware = require('../../lib/jwtAuthMiddleware');

/**
 * 
 * GET /anuncios
 * obtener una lista de anuncios
 */
router.use(jwtAuthMiddleware()); // Express comprueba que token sea valido antes deejecutar lo siguiente

router.get('/', (req, res, next) => {

    //hay que poner indices para que vaya mejor en el modelo
    //Datos de entrada
    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const tag = req.query.tag;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip); // para saltarse
    const fields = req.query.fields;
    const sort = req.query.sort;




    const filter = {};


    //busqueda por nombre
    if (nombre) {
        filter.nombre = new RegExp('^' + req.query.nombre, "i");
    }

    //busqueda si se venden o buscan
    if (venta) {
        filter.venta = venta
    }

    //busqueda por precio
    if (precio) {

        console.log("El valore de precio: ", precio)
        if (precio == 50) {
            filter.precio = precio
        } else if (precio === "10-50") {

            filter.precio =
                { '$gte': '10', '$lte': '50' }

        } else if (precio === "10-") {

            filter.precio = {
                '$gte': '10'
            }

        } else if ('-50') {

            filter.precio = { '$lte': '50' }
        }

    }

    //busqueda por tags
    if (tag) {
        filter.tags = tag

    }

    const query = Anuncio.find(filter);

    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);


    query.exec((err, lista) => {

        if (err) {
            next(err);
            return;
        }

        res.json({ success: true, results: lista });
    });

});


module.exports = router;