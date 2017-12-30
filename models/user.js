const mongoose = require('mongoose');
const {Schema} = mongoose; //ES6 destructuring

const userSchema = new Schema({
    googleId: String, 
    userName: String
})

mongoose.model('users', userSchema);