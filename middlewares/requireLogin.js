module.exports= (req, res, next) => {
 if(!req.user){
    //  return randomBytes.status(401).send({error: "you must log in!"});
    res.send('not logged in');
    res.redirect('/');
 }

 next();
};

//next called after function finishes running. runs next middleware. 