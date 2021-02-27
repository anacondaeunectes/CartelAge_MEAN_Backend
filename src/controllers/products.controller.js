const productCtrl = {};

const Product = require('../models/Product');

const fs = require('fs-extra');

const path = require('path');

productCtrl.getProducts = async (req, res) => {
    const productsList = await Product.find();
    res.json(productsList);
};

productCtrl.createProduct = async (req, res) => {
    console.log('here i am')
    console.log(req.body);
    await new Product(req.body).save();
    res.send({message: 'Created succesfully'})
};

productCtrl.getProduct = async (req, res, next) => {
        console.log(req.params);
        // console.log(err)
        const productResult = await Product.findOne({_id: req.params.id});
        // console.log(productResult.imagePath);
        res.send(productResult);

};

productCtrl.editProduct = async (req, res) => {
    await Product.updateOne({_id: req.params.id}, req.body);
    res.send({status: 'Product updated'});
};

productCtrl.deleteProduct = async (req, res) => {
   
    const film = await Product.findByIdAndRemove(req.params.id);

    console.log(film);

    // In case a film is found, the img related is going to be deleted from server by searching it by its "imagePath" property.
    // To delete the photo its used the "fs-extra" middleware by using the unlink(<absolute path>) method. To get the absolute path its used the parth.resolve() method from "path" middleware.
    if(film) {
        console.log(path.resolve(film.imagePath));
        await fs.unlink(path.resolve(film.imagePath));
    }
    
    res.send({status: 'Product deleted'});
};

module.exports = productCtrl;