const fs            = require('fs');
exports.logError = function (err, req, res, next){
    if (!err) {
        next()
    } else {
        console.log('error yaya!!')
        // console.error(err.stack)
        let errorData= {Date: new Date().toLocaleString(),errorMessage: err.stack};
        fs.appendFile('./errorLogs/serverError.log', JSON.stringify(errorData) + '\n', function (err) {
            if (err) next(err); 
            console.log('Updated!');
         });
        res.status(500).render('error', { error: err });
        next(err);
    }


};

exports.errorHandler = (err, req, res, next)=>{
    if (res.headersSent) {
        return next(err)
      }
      res.status(500)
      res.render('error', { error: err })
    
};

exports.clientErrorHandler=(err, req, res, next)=>{
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' })
      } else {
        next(err)
      }
    
}