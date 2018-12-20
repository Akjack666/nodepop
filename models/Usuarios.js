'use strict'

const mongoose = require('mongoose');

//Definimos un esquema 
const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: { type: String, index: true},
    clave: String
});

//creamos el modelo

const Usuario = mongoose.model('Usuario', usuarioSchema)


// exportamos el modelo (opcional)

module.exports = Usuario;