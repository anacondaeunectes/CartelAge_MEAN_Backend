const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String
    }
})

module.exports = model('usuario', usuarioSchema);