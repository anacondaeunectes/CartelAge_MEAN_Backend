/*
    This js contains server funcionality and logic
*/

/*
*    Server uses:
*       - 'Express' as HTTP request handler
*       - 'Mongoose' as server - DB (MongoDB) intermediary
*       - 'Multer' as File Uploader manager middleware (on products.routes.js)
*       - 'Morgan' to read basic info of every http request that this server receive
*       - 'Path' in order to achieve an easier file's path manage
*       - 'Cors`in order to enable all CORS requests 
*/
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const config = require('../config.json');

//Express server isntance
const app = express();

//Middleware that allows Express to read json objects from HTTP methods requests (Same scope as bodyParser used on example project)
app.use(express.json());

//Middleware that allows Express to read HTML forms
app.use(express.urlencoded({extended: false}));

app.use(cors());

//Middleware to get HTTP requests info
app.use(morgan('dev'));

//Settings. Takes port value from 'config.json' file or 3000 by default 
app.set('port', config.port || 3000);

//Every route is going to be handled by the JS file of the parameter
app.use('/api', require('./routes/products.routes'));

app.use('/photo', express.static(path.resolve('uploads')));
app.use('/uploads', express.static(path.resolve('uploads')));

//DB address
const uri = 'mongodb://localhost:27017/cartelAge_MEAN';

mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
);

mongoose.connection.once('open', () => console.log('DB succesfully connected to ', uri))
mongoose.connection.on('error', () => console.log('Error while trying to connect with ', uri))


module.exports = app;