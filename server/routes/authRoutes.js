const passport = require('passport');
const fs = require('fs');
const path= require('path');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy= require('passport-local').Strategy;
const keys = require('../config/keys');
const { User, Binder, Tab, Page, Note, Video } = require('../models');





module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        // scope: ['profile', 'email']
        scope: ['https://www.googleapis.com/auth/plus.login']
    })
    );


    app.get('/auth/google/callback', passport.authenticate('google'),
        (req, res) => {
            
            res.redirect('/main');

    });

    app.post('/auth/sample', passport.authenticate('local', {successRedirect: '/main', failureRedirect: '/'}),
        (req, res)=>{
            console.log(req.user); 
            // res.redirect('/main');  axios calls don't allow redirect
        }
    );

    app.get('/api/logout', (req, res, next) => {
        let loginLog= {Date: new Date().toLocaleString(),user: `user ${req.user.userName} has logged out`};
        fs.appendFile(path.join(__dirname, '..', 'errorLogs', 'logins.log'), JSON.stringify(loginLog) + '\n', function (err) {
            if (err) next(err); 
            console.log('Updated!');
        });
    
        req.logout();
        
        res.redirect('/'); //nothing will be sent out since logged out
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user); //req.session has what cookie has saved
    })
}
