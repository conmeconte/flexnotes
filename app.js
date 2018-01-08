const express       = require('express');
const mongoose      = require('mongoose');
const cookieSession = require('cookie-session');
const passport      = require('passport');
const bodyParser    = require('body-parser');
const keys          = require('./config/keys');

const app   = express();
const PORT  = process.env.PORT || 9000;

/* Create connection to Mongo and Load in Auth Strategy */
// require('./connection')(mongoose);
/* Mongoose Connection */
mongoose.connect('mongodb://andy:andy@ds041506.mlab.com:41506/yumyum');
mongoose.Promise= global.Promise; 

var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('connected to mongodb through mongoose')
});
// end of testing
require('./services/passport');// user must be loaded first so that it creates the mongoose schema to be used in passport

/* Consuming middleware throughout app */
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,  //set up cookie life-time, might have to use express session if we want to store more data into a single session    })
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());


/* Routing middleware */
require('./routes/authRoutes')(app);
require('./routes/apiRoutes')(app);


/* Start server and listen on PORT */
app.listen(PORT, ()=>{
    console.log('Server is Running at localhost:' + PORT);
});