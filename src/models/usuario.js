const { Schema, model } = require('mongoose');

// Moongose Schema for users documents
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

//Mongoose model to define 'usuarios' MongoDB collection 
module.exports = model('usuario', usuarioSchema);