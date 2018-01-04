const passport = require('passport');


module.exports = app =>{
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google'),
    (req, res)=>{

        res.redirect('/main');

    });

    app.get('/api/logout', (req,res)=>{
        req.logout();
        res.redirect('/'); //nothing will be sent out since logged out
    });

    app.get('/api/current_user', (req, res)=>{
<<<<<<< HEAD
        res.send(req.user); //req.session has what cookie has saved
=======
        console.log(req.user);
        res.send(req.user); //req.session has what cookie has saved 
<<<<<<< HEAD
>>>>>>> 6ca3dda076ccd400dbf0e94c1bd7ba52e694d8ea
    })
}
=======
    });
};
>>>>>>> 534b50529c420f59b0dd52cd40603e15c51ad136
