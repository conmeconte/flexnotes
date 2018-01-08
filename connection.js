module.exports = function(mongoose) {
    /* Mongoose Connection */
    mongoose.connect('mongodb://andy:andy@ds041506.mlab.com:41506/yumyum');
    mongoose.Promise= global.Promise; 

    var db = mongoose.connection; 
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', function() {
        console.log('connected to mongodb through mongoose')
    });
    // end of testing
}