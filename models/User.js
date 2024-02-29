const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');


const UserSchema = new Schema({
    username: {
        type: String,
        required:[true,'Please provide username'],
        unique:true
    },
    password: {
        type:String,
        required:[true,'Please provide password']
    }
});

UserSchema.plugin(uniqueValidator);

//before we save any req.body into our users collection, execute function 
//this is how our user.password is hashed before it is saved to the db 
UserSchema.pre('save', function (next) {
    //the user being saved
    const user = this;
    console.log(`this has a value of ${user}`);

    bcrypt.hash(user.password, 10, (error, hash) => {
        //replace the original password with the hashed password
        user.password = hash;
        console.log(`hashed password is ${user.password}`);
        next();
    });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;