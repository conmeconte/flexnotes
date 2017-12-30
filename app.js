const express = require('express');
const mongoose=require('mongoose');
const cookieSessioni= require('cookie-session');
const passport = require('passport');
const keys= require('./config/keys');
require('./models/user');
require('./services/passport');// user must be loaded first so that it creates the mongoose schema to be used in passport

mongoose.connect(kyes.mogoURI);

const app= express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,  //set up cookie life-time, might have to use express session if we want to store more data into a single session    })
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);



const PORT = process.env.PORT || 9000;
app.listen(PORT, ()=>{
    console.log('Server is Running at localhost:' + PORT);
});