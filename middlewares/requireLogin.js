module.exports= (req, res, next) => {
 if(!req.user){
     return randomBytes.status(401).send({error: "you must log in!"});
 }

 next();
};


//next called after function finishes running. runs next middleware. 