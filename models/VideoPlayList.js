const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoPlayListSchema = new Schema({
    videoId: String,
    videoURL: String,
    videoTitle: String 
});

module.exports = videoPlayListSchema;