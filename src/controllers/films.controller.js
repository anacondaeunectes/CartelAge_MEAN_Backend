// Controller for films related requests
const filmCtrl = {};

const Film = require('../models/Film');

const fs = require('fs-extra');

const path = require('path');

/**
 * Get all films from DB
 */
filmCtrl.getFilms = async (req, res) => {
    const filmsList = await Film.find();
    res.json(filmsList);
};

/**
 * Create a new film based on request's body
 */
filmCtrl.createFilm = async (req, res) => {
    await new Film(req.body).save();
    res.send({message: 'Created succesfully'})
};

/**
 * Gets a film from DB by the ID given in request's params 
 */
filmCtrl.getFilm = async (req, res) => {
    console.log(req.params);
    const filmResult = await Film.findOne({_id: req.params.id});
    res.send(filmResult);

};

/**
 * Updates a film in DB
 */
filmCtrl.editFilm = async (req, res) => {
    await Film.updateOne({_id: req.params.id}, req.body);
    res.send({status: 'Film updated'});
};

/**
 * Removes a film from DB based on request's ID parameter
 */
filmCtrl.deleteFilm = async (req, res) => {
   
    const film = await Film.findByIdAndRemove(req.params.id);

    // In case a film is found, the img related is going to be deleted from server by searching it by its "imagePath" property.
    // To delete the photo its used the "fs-extra" middleware by using the unlink(<absolute path>) method. To get the absolute path its used the parth.resolve() method from "path" middleware.
    if(film) {
        console.log(path.resolve(film.imagePath));
        await fs.unlink(path.resolve(film.imagePath));
    }
    
    res.send({status: 'Film deleted'});
};

module.exports = filmCtrl;