module.exports=   (req, res, next) => {
 if(!req.user){
    res.redirect('/');
    // return res.redirect(401, 'http://google.com');
    console.log('works');
    // return res.status(401).send({error: "you must log in!"});
    
 } else {
    next();
 }

};

//next called after function finishes running. runs next middleware. 