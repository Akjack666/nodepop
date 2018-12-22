console.log("Instalacion db")

'use strict';


const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

mongoose.connection.on('error', err => {

    console.log('Error de conexion', err);
    process.exit(1);
})

mongoose.connection.once('open', () => {

    console.log('Conectado a MongoDB en', mongoose.connection.name);

    mongoose.connection.db.collection("anuncios").drop(function (err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Coleccion de anuncios borrada");

    });

    mongoose.connection.db.collection("usuarios").drop(function (err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Coleccion de usuarios borrada");

    });

    var data = [
        {
            "nombre": "Bicicleta",
            "venta": true,
            "precio": 230.15,
            "foto": "images/anuncios/bici.jpg",
            "tags": ["lifestyle", "motor"]
        },
        {
            "nombre": "Gafas de sol",
            "venta": true,
            "precio": 30,
            "foto": "images/anuncios/gafas.jpg",
            "tags": ["lifestyle"]
        },
        {
            "nombre": "iPhone 3GS",
            "venta": false,
            "precio": 50.00,
            "foto": "images/anuncios/iphone.png",
            "tags": ["lifestyle", "mobile"]
        }];


    // Como es un usuario de prueba, se asume que luego se eliminara, o se cambiaran los datos,
    //Por eso no he visto necesario encriptar la contraseña
    var usuario = {

        nombre: 'admin',
        email: 'admin@admin.es',
        clave: 'admin'
    }


    mongoose.connection.db.collection("anuncios").insert(data, function (err, res) {
        if (err) throw err;
        console.log("Anuncios introducidos correctamente");

        mongoose.connection.close();
    });

    mongoose.connection.db.collection("usuarios").insert(usuario, function (err, res) {
        if (err) throw err;
        console.log("Usuario introducido correctamente");

        mongoose.connection.close();
    });



});

mongoose.connect('mongodb://localhost/nodepopdb', { useNewUrlParser: true });

module.exports = mongoose.connection;