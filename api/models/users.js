//GRAB THE PACKAGE
const mongoose    =  require('mongoose');
const Schema      =  mongoose.Schema;
const bcrypt      =  require('bcrypt-nodejs');

//create UserSchema
const userSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {type : String},
    username : {type : String, required : true, index : {unique : true} },
    password : {type : String, required : true, select : false}

});
//hash the password before the user is saved
userSchema.pre('save', function(next) {
    const user = this;
    //hash the password only if the password has been changed or user is new
    if(!user.isModified('password'))
        return next();
    //generate the hash
    bcrypt.hash(user.password, null, null, (err, hash) => {
        if(err) return next(err);
        //change the password to the hash version
        user.password = hash;
        next();
    });
});
//method to compare a given password with the database
userSchema.methods.comparePassword = function(password){
    const user = this;
    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', userSchema);