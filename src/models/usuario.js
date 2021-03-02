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
    },
    favRefs: {
        type: Array,
        default: []
    }
})

module.exports = model('usuario', usuarioSchema);