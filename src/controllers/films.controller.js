const filmCtrl = {};

const Film = require('../models/Film');

const fs = require('fs-extra');

const path = require('path');

filmCtrl.getFilms = async (req, res) => {
    const filmsList = await Film.find();
    res.json(filmsList);
};

filmCtrl.createFilm = async (req, res) => {
    console.log('here i am')
    console.log(req.body);
    await new Film(req.body).save();
    res.send({message: 'Created succesfully'})
};

filmCtrl.getFilm = async (req, res) => {
    console.log(req.params);
    // console.log(err)
    const filmResult = await Film.findOne({_id: req.params.id});
    // console.log(productResult.imagePath);
    res.send(filmResult);

};

filmCtrl.editFilm = async (req, res) => {
    await Film.updateOne({_id: req.params.id}, req.body);
    res.send({status: 'Film updated'});
};

filmCtrl.deleteFilm = async (req, res) => {
   
    const film = await Film.findByIdAndRemove(req.params.id);

    console.log(film);

    // In case a film is found, the img related is going to be deleted from server by searching it by its "imagePath" property.
    // To delete the photo its used the "fs-extra" middleware by using the unlink(<absolute path>) method. To get the absolute path its used the parth.resolve() method from "path" middleware.
    if(film) {
        console.log(path.resolve(film.imagePath));
        await fs.unlink(path.resolve(film.imagePath));
    }
    
    res.send({status: 'Film deleted'});
};

module.exports = filmCtrl;