const passport = require('passport');


module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    })
    );

    app.get('/auth/google/callback', passport.authenticate('google'),
        (req, res) => {

            res.redirect('/main');

    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/'); //nothing will be sent out since logged out
    });

    app.get('/api/current_user', (req, res) => {
        console.log(req.user);
        console.log(req.session);
        res.send(req.user); //req.session has what cookie has saved
    })
}
