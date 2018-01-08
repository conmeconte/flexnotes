const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Video Schema */

const videoSchemaNew = new Schema({
    vid_url : String,
    videoInfo: String
});

module.exports = videoSchemaNew;