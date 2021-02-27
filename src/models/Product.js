const { Schema, model } = require('mongoose');

//Moongose Schema
const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String
    },
    isFav: {
        type: Boolean,
        default: false
    },
    imagePath: {
        type: String
    }
})

//Mongoose model to define MongoDB collection 
module.exports = model('Product', productSchema);