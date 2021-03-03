// Controller for user related requests
const userCtrl = {};

const User = require('../models/usuario');

userCtrl.getUser = async (req, res) => {
    const user = await User.findOne({_id: req.params.id});
    res.send(user.favRefs);
}

userCtrl.favFilm = async (req, res) => {
    // $addToSet works as $push but it doesnt push if the new value is already on the array
    console.log('asdasd')
    const gg = await User.updateOne({_id: req.params.id}, {$addToSet: {favRefs: req.body.new}})
    console.log('LLEGO')
    res.send({status: 'User updated'});
}

userCtrl.unfavFilm = async (req, res) => {
    console.log('asdasd')
    // $pull remove an element from an array
    const gg = await User.updateOne({_id: req.params.id}, {$pull: {favRefs: req.body.toRemove}})
    console.log('LLEGO')
    res.send({status: 'User updated'});
}

module.exports = userCtrl;