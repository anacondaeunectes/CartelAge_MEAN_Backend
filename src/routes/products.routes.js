// Router from express to manage HTTP requests
const router = require('express-promise-router')();

// Multer is a middleware that allows to upload files
const multer = require('multer');

// ----------------------------





//-----------------------------

/* 
* Multer configuration: 
    - "destination" set the destination folder
    - "filename" describes what the file should be named in the "destination" folder
*/
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

//Multer instance whit the whole configuration previously given
const upload = multer({storage: storage});

const googleAuth = require('../controllers/auth.controller');

const filmModel = require('../models/Product');

const productCtrl = require('../controllers/products.controller');

router.get('/product', productCtrl.getProducts);

router.get('/product/:id', productCtrl.getProduct);

router.post('/product', productCtrl.createProduct);

router.post('/product', async (req, res) => {
    console.log('here i am v2');
});

router.post('/photo', upload.single('image'), async (req, res) => {
    const { title, description } = req.body;

    const film = {
        name: title,
        description: description,
        imagePath: req.file.path
    }

    const filmToSave = new filmModel(film);

    await filmToSave.save();
    
    res.json({message: 'LLego', filmToSave})
});

router.put('/product/:id', productCtrl.editProduct);

router.delete('/product/:id', productCtrl.deleteProduct);

router.post('/google/auth', async (req, res) => {
    // console.log(req.body)

    googleAuth.googleSignIn(req, res);

    // const ticket = await client.verifyIdToken({
    //     idToken: req.body.token,
    //     audience: keys.web.client_id
    // })
    
    // const { name: nombre, 
    //     picture: img, 
    //     email: correo
    //   } = ticket.getPayload();

    //   console.log(ticket.getPayload())
}
)


router.use( (err, req, res, next) => {
    console.error('Message Error: ', err.message)
    res.status(403).send(err.message);
    // console.log('OJOOOOO')
})


module.exports = router;    