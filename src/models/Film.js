const { Schema, model } = require('mongoose');

//Moongose Schema for films documents
const filmSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    imagePath: {
        type: String
    }
})

//Mongoose model to define 'films' MongoDB collection 
module.exports = model('Film', filmSchema);