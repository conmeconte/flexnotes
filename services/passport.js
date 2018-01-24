const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const fs            = require('fs');
const path = require('path');
const { User, Binder, Tab, Page, Note, Video } = require('../models');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) {
                let loginLog= {Date: new Date().toLocaleString(),user: `user ${existingUser.userName} has logged in`};
                fs.appendFile(path.join(__dirname, '..', 'errorLogs', 'logins.log'), JSON.stringify(loginLog) + '\n', function (err) {
                    // if (err) throw err; 
                    if (err) console.log('writing log failed'); 
                    console.log('User Login Updated!');
                });
                return done(null, existingUser);
            }
            //no user record in db make a new record
            const defaultBinder = new Binder({binder_name: "Binder"});
            defaultBinder.tab_arr_obj.push(new Tab({tab_name :"Tab"}));
            defaultBinder.tab_arr_obj[0].page_arr_obj.push(new Page({ page_name : "Page", page_color: 'orange', notes:{document:{}} }));
            defaultBinder.tab_arr_obj[0].page_arr_obj[0].video.push(new Video({ videoInfo: 'No Info' }));
            const user = await new User({
                googleId: profile.id,
                userName: profile.displayName,
                binder_arr_obj: [defaultBinder]
            }).save()
            done(null, user);


        }
    )
);

