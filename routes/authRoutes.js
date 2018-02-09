const passport = require('passport');
const fs = require('fs');
const path= require('path');


module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email', 'https://www.googleapis.com/auth/admin.directory.resource.calendar']
    })
    );

    app.get('/auth/google/callback', passport.authenticate('google'),
        (req, res) => {
            
            res.redirect('/main');

    });

    app.get('/api/logout', (req, res, next) => {
        let loginLog= {Date: new Date().toLocaleString(),user: `user ${req.user.userName} has logged out`};
        fs.appendFile(path.join(__dirname, '..', 'errorLogs', 'logins.log'), JSON.stringify(loginLog) + '\n', function (err) {
            // if (err) throw err; 
            if (err) next(err); 
            console.log('Updated!');
        });
    
        req.logout();
        res.redirect('/'); //nothing will be sent out since logged out
    });

    app.get('/api/current_user', (req, res) => {
        // console.log(req.user);
        // console.log(req.session);
        res.send(req.user); //req.session has what cookie has saved
    })
}
