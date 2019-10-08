//GRAB THE PACKAGE
const mongoose    =  require('mongoose');
const Schema      =  mongoose.Schema;

//create UserSchema
const userSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    username : String,
    password : String

});

module.exports = mongoose.model('User', userSchema);