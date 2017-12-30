const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys= require('../config/keys');

const User= mongoose.model('users');


passport.serializeUser((user,done)=>{
    done(err, user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{
        done(err, user);
    })
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done)=>{
            User.findOne({googleId: profile.id}).then(existingUser=>{
                if(existingUser){
                    //if we already have user data
                    done(err, existingUser);
                } else{
                    // if new user
                    new User({
                        googleId: profile.id,
                        userName: profile.displayName
                    }).save(). then(user=> done(err, user));
                }
            })
        }
    )
)