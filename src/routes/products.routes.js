// Router from express to manage HTTP requests
const router = require('express-promise-router')();

// Multer is a middleware that allows to upload files
const multer = require('multer');

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

const filmModel = require('../models/Film');

const Usuario = require('../models/usuario');

const filmCtrl = require('../controllers/films.controller');

// ----------------------------------------
//  Related with films
// ----------------------------------------

router.get('/film', filmCtrl.getFilms);

router.get('/film/:id', filmCtrl.getFilm);

router.post('/film', filmCtrl.createFilm);

router.put('/film/:id', filmCtrl.editFilm);

router.delete('/film/:id', filmCtrl.deleteFilm);

// ----------------------------------------
//  Image upload
// ----------------------------------------

router.post('/photo', upload.single('image'), async (req, res) => {
    const { name } = req.body;

    const film = {
        name/*: title*/,
        // description: description,
        imagePath: req.file.path
    }

    const filmToSave = new filmModel(film);

    await filmToSave.save();
    
    res.json({message: 'Succesfully uploaded', filmToSave})
});

// ----------------------------------------
//  Related with google auth
// ----------------------------------------

router.post('/google/auth', async (req, res) => {

    googleAuth.googleSignIn(req, res);
})


router.use( (err, req, res, next) => {
    console.error('Message Error: ', err.message)
    res.status(403).send(err.message);
})


module.exports = router;    