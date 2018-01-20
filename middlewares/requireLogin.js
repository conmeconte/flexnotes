module.exports= function(err,req, res, next) {
 if(!req.user){
    // res.redirect('/');
    // return res.redirect('http://google.com');
    res.status(401).redirect('/');
    next(err);
 } else {
    next();
 }

};

//next called after function finishes running. runs next middleware. 