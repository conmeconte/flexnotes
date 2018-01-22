const express       = require('express');
const mongoose      = require('mongoose');
const cookieSession = require('cookie-session');
const passport      = require('passport');
const keys          = require('./config/keys');
const path          = require('path');

const { logError, errorHandler, clientErrorHandler } = require('./middlewares/handleError');
const fs            = require('fs');

// let dummyData = require('./dummyData/backEndDummyData');
const app   = express();
const PORT  = process.env.PORT || 9000;

/* Create connection to Mongo and Load in Auth Strategy */
// require('./connection')(mongoose);
/* Mongoose Connection */
mongoose.connect(keys.mongoURI);
mongoose.Promise= global.Promise; 


var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('connected to mongodb through mongoose');
});

require('./services/passport');// user must be loaded first so that it creates the mongoose schema to be used in passport

/* Consuming middleware throughout app */
// app.use(bodyParser.json());
app.use(express.json());
// app.use(express.urlencoded());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,  //set up cookie life-time, might have to use express session if we want to store more data into a single session    })
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'client', 'dist')));


/* Routing middleware */
require('./routes/authRoutes')(app);
require('./routes/realApiRoutes')(app, db);
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
app.use(logError);
app.use(errorHandler);
app.use(clientErrorHandler);

/* Start server and listen on PORT */
app.listen(PORT, ()=>{
    console.log('Server is Running at localhost:' + PORT);
});