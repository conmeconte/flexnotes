const mongoose = require('mongoose');
const { Schema } = mongoose;

/* User Schema */

const userSchemaNew = new Schema({
    googleId: String, 
    userName: String,
    binder_arr_obj : []
});

module.exports = userSchemaNew;


