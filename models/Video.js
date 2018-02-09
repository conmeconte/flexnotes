const mongoose = require('mongoose');
const { Schema } = mongoose;
const videoPlayList = require('./VideoPlayList');


/* Video Schema */

const videoSchemaNew = new Schema({
    videoId: String,
    videoURL: String,
    videoTitle: String 
});

module.exports = videoSchemaNew;