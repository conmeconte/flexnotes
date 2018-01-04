const mongoose= require('mongoose');
const {Schema} = mongoose;
const tabSchema = require('./Tabs');

const binderSchema = new Schema({
    binder_name: String, 
    binder_obj : [tabSchema],
    _user: {type: Schema.Types.ObjectId, ref: 'User'}
})