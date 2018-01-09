const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

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
                //we already have
                // console.log("google provides this info ", profile);
                // console.log(existingUser);
                return done(null, existingUser);
            }
            //no user record in db make a new record
            // console.log(profile);
            const defaultBinder = new Binder();
            defaultBinder.tab_arr_obj.push(new Tab());
            defaultBinder.tab_arr_obj[0].page_arr_obj.push(new Page({ page_color: 'orange' }));
            defaultBinder.tab_arr_obj[0].page_arr_obj[0].video.push(new Video({ videoInfo: 'No Info' }));
            defaultBinder.tab_arr_obj[0].page_arr_obj[0].notes.document.nodes.push(new Note());
            const user = await new User({
                googleId: profile.id,
                userName: profile.displayName,
                binder_arr_obj: defaultBinder   //how come this works even thought it's an array array: obj?
            }).save()
            done(null, user);


        }
    )
);

