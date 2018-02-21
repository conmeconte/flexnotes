const mongoose = require('mongoose');
const userSchemaNew = require('./User');
const binderSchemaNew = require('./Binder');
const tabSchemaNew = require('./Tabs');
const pageSchemaNew = require('./Page');
const notesNode = require('./NotesNode');
const videoSchemaNew = require('./Video');
const videoPlayListSchemaNew= require('./VideoPlayList');

const models = {
    User: mongoose.model('users', userSchemaNew),
    Binder: mongoose.model('binders', binderSchemaNew),
    Tab: mongoose.model('tabs', tabSchemaNew),
    Page: mongoose.model('datapages', pageSchemaNew),
    Video: mongoose.model('datavideos', videoSchemaNew),
    Note: mongoose.model('notesNodeArr', notesNode),
    VideoPlayList: mongoose.model('videoPlayList', videoPlayListSchemaNew)

}

module.exports = models;