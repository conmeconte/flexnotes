const fs            = require('fs');

module.exports= function(req, res, next) {
 if(!req.user){
    // res.redirect('/');
    // return res.redirect('http://google.com');
    let errorData= {Date: new Date().toLocaleString(),errorMessage: 'Illegal Login Attempt'};
    fs.appendFile('./errorLogs/serverError.log', JSON.stringify(errorData) + '\n', function (err) {
        if (err) throw err; 
        console.log('Updated!');
     });
    res.status(401).redirect('/');
 
 } else {
    next();
 }

};

//next called after function finishes running. runs next middleware. 