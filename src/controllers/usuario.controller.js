// Controller for user related requests
const userCtrl = {};

const User = require('../models/usuario');

/**
 * Gets an user object from DB based on request id parameter
 */
userCtrl.getUser = async (req, res) => {
    const user = await User.findOne({_id: req.params.id});
    res.send(user.favRefs);
}

/**
 * Adds a film if to user fav list (favRefs). User to be updated depends on request's id parameter
 */
userCtrl.favFilm = async (req, res) => {
    // $addToSet works as $push but it doesnt push if the new value is already on the array
    const gg = await User.updateOne({_id: req.params.id}, {$addToSet: {favRefs: req.body.new}})
    console.log('LLEGO')
    res.send({status: 'User updated'});
}

/**
 * Removes a film id from user's fav list (favRefs) based on request's body 'toRemove' parameter. 
 * User to be updated depends on request's id parameter
 */
userCtrl.unfavFilm = async (req, res) => {
    // $pull remove an element from an array
    const gg = await User.updateOne({_id: req.params.id}, {$pull: {favRefs: req.body.toRemove}})
    console.log('LLEGO')
    res.send({status: 'User updated'});
}

/**
 * Removes a film id from ALL USERS'S fav list (favRefs) based on request's body 'toRemove' parameter.
 */
userCtrl.unfavFilmToAllUsers = async (req, res) => {
    const gg = await User.updateMany({}, {$pull: {favRefs: req.body.toRemove}});
    console.log('all: ', gg);
    res.send({status: 'Users updated'});
}

module.exports = userCtrl;