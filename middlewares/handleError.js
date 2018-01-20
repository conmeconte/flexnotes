exports.logError = function (err, req, res, next){
    if (!err) {
        next()
    } else {
        console.error(err.stack)
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