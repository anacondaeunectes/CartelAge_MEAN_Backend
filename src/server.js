/*
    This js contains server funcionality and logic
*/

/*
*    Server uses:
*       - express as HTTP request handler
*       - Mongoose as server - DB (MongoDB) intermediary
*       - Multer as File Uploader manager middleware (on products.routes.js)
*/
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

//Express server isntance
const app = express();

//Middleware that allows Express to read json objects from HTTP methods requests (Same scope as bodyParser used on example project)
app.use(express.json());

//Middleware that allows Express to read HTML forms
app.use(express.urlencoded({extended: false}));

app.use(cors());

//Middleware to get HTTP requests info
app.use(morgan('dev'));

//Settings -- OJO -> Mover a un archivo oculto aparte (como en el video)¿? 
app.set('port', process.env.PORT || 3000);

//Every route is going to be handled by the JS file of the parameter
app.use(require('./routes/products.routes'));

app.use('/photo', express.static(path.resolve('uploads')));
app.use('/uploads', express.static(path.resolve('uploads')));

//DB address
const uri = 'mongodb://localhost:27017/testMEAN';

//Mongoose model to wotk with MongoDB
const Product = require('./models/Product');

mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
);

mongoose.connection.once('open', () => console.log('DB succesfully connected to ', uri))
mongoose.connection.on('error', () => console.log('Error while trying to connect with ', uri))


// const newProduct = new Product({
//     name: 'La historia interminable',
//     description: 'Tu puedes Atreyu!!'
// })

// newProduct.save( (err, document) => {
//     if(err){
//         console.log(err)
//     }
//     console.log(document)
// } )

module.exports = app;