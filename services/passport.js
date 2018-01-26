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
            defaultBinder.tab_arr_obj[0].page_arr_obj.push(new Page({
                page_name : "Page",
                page_color: 'orange',
                notes:{
                    document:{
                        content: "{\"kind\":\"value\",\"document\":{\"kind\":\"document\",\"data\":{},\"nodes\":[{\"kind\":\"block\",\"type\":\"heading-one\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"Welcome to FlexNotes!\",\"marks\":[]}]}]},{\"kind\":\"block\",\"type\":\"paragraph\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]},{\"kind\":\"block\",\"type\":\"paragraph\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"FlexNotes was designed to help students keep all their class information in one place for easy access and review.\",\"marks\":[]}]}]},{\"kind\":\"block\",\"type\":\"paragraph\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]},{\"kind\":\"block\",\"type\":\"paragraph\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"You can start by separating each subject into binders and then organize your notes into tabs and pages.\",\"marks\":[]}]}]},{\"kind\":\"block\",\"type\":\"paragraph\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]},{\"kind\":\"block\",\"type\":\"paragraph\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"Each page will have a space for you to save any slides and videos from class as well as a notepad where you can type up your notes.\",\"marks\":[]}]}]},{\"kind\":\"block\",\"type\":\"paragraph\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]},{\"kind\":\"block\",\"type\":\"paragraph\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"Don't have any class videos? No problem! You can search YouTube directly from your page and find videos that can help reinforce what you have learned so far!\",\"marks\":[]}]}]},{\"kind\":\"block\",\"type\":\"paragraph\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]},{\"kind\":\"block\",\"type\":\"image\",\"isVoid\":true,\"data\":{\"src\":\"http://www.ccc.edu/menu/PublishingImages/laptop%20discount%20program.jpg\"},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\" \",\"marks\":[]}]}]},{\"kind\":\"block\",\"type\":\"paragraph\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\" \",\"marks\":[]}]}]},{\"kind\":\"block\",\"type\":\"paragraph\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]}]}}"
                    }
                }
            })
            );
            defaultBinder.tab_arr_obj[0].page_arr_obj[0].video.push(new Video({ "videoURL": "https://www.youtube.com/embed/9hkYrKYu7tI", "videoId" : "9hkYrKYu7tI" }));
            defaultBinder.tab_arr_obj[0].page_arr_obj[0].lecture_slides={"lec_id": "https://docs.google.com/presentation/d/1ijcyjcRNCHacUGmsqU_x-hx4xlMe0NVjTg2QcQ7BpgM/embed"}
            
            const user = await new User({
                googleId: profile.id,
                userName: profile.displayName,
                binder_arr_obj: [defaultBinder]
            }).save()
            done(null, user);


        }
    )
);

