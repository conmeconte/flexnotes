const passport= require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id)
        .then(user=>{
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
        async (accessToken, refreshToken, profile, done)=>{
            const existingUser= await User.findOne({googleId:profile.id});
            if(existingUser){
                //we already have
                console.log("google provides this info ", profile);
                console.log(existingUser);
                return done(null, existingUser); 
            }
            //no user record in db make a new record
            console.log(profile);
            const user= await new User({googleId: profile.id, userName: profile.displayName}).save()
                done(null, user);
        
       }
    )
);

