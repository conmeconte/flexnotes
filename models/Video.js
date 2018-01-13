const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Video Schema */

const videoSchemaNew = new Schema({
    playlist : [],
    videoLink: String
});

module.exports = videoSchemaNew;