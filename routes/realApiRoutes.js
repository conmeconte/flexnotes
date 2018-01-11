const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const { User, Binder, Tab, Page, Note, Video } = require('../models');
// const User = require('../controllers/user');
//Restful/ CRUD operation 

module.exports = (app, db) => {
    app.get('/', (req, res) => {
        res.send('Homepage')
    })
    app.get('/api/userInfo', requireLogin, (req, res) => {
        console.log(req.user.id)
        res.send(req.user);
    });


    app.get('/api', async (req, res) => {
        //pull entire user obj
        User.findById(req.user.id, (err,user)=>{
            res.send(user);
        })

    })
    // For Binder //
    app
        .get('/api/binder', async (req, res) => {
            //give binder data
            //userId accessible via req.param.userId?
            const existingUser= await User.findOne({ 'googleId': req.user.googleId }, function (err, user){
                if (err) { res.send("Error did occurred") };

                if (user) {
                    res.send(user);
                }else {
                res.send("Error can't find user")
                }
                res.end();
            })
        })
        .post('/api/binder', async (req, res) => {
            const existingUser= await User.findById(req.user.id,function(err,user){
                if (err) { res.send("Error did occurred") };
    
                if (user) {
                    const binder = user
                    .binder_arr_obj.id('5a56b2782962901f9c0fe0fd') //req.body.binder_arr_obj_id
                    if(binder){
                        const defaultBinder = new Binder();
                        defaultBinder.tab_arr_obj.push(new Tab());
                        defaultBinder.tab_arr_obj[0].page_arr_obj.push(new Page({ page_color: 'orange' }));
                        defaultBinder.tab_arr_obj[0].page_arr_obj[0].video.push(new Video({ videoInfo: 'No Info' }));
                        defaultBinder.tab_arr_obj[0].page_arr_obj[0].notes.document.nodes.push(new Note());
                        user.binder_arr_obj.push(defaultBinder);
                        user.save()
                        res.send(user);
                    }else{res.send('wrong path')}
                    
                }else {
                res.send("Error can't find user")
                }
            })

        })
        .delete('/api/binder', async (req, res) => {
            const existingUser= await User.findById(req.user.id,function(err,user){
                if (err) { res.send("Error did occurred") };
    
                if (user) {
                    const binder = user
                    .binder_arr_obj.id(req.body.binderID) //req.body.binder_arr_obj_id
                    
                    binder.remove();
                    user.save();
                    res.send(user);
                    
                }else {
                res.send("Error can't find user")
                }
            })
        })
        .put('/api/binder', async (req, res) => {
            // update binder
            const existingUser= await User.findById(req.user.id, function (err, user){
                if (err) { res.send("Error did occurred")};
    
                if (user) {
                    const binder = user
                    .binder_arr_obj.id(req.body.binderID) //req.body.binder_arr_obj_id
                    
                    binder.binder_color = req.body.binder_color || binder.tab_color;
                    binder.binder_name = req.body.binder_name || binder.tab_name;
                    
            
                    user.save();
                    res.send(user);
                }else {
                res.send("Error can't find user")
                }
                res.end();
        
            });
        })
    // For Tab//
    // For Tab//
    // For Tab//
    // For Tab//
    app
        .get('/api/tab', async (req, res) => {
            const existingUser= await User.findOne({ 'googleId': "103970352561814947806" }, function (err, user){
                if (err) { res.send("Error did occurred")};

                if (user) {
                    res.send(user);
                }else {
                res.send("Error can't find user")
                }
                res.end();
        
            });
        })
        .post('/api/tab', async (req, res) => {
            //create new tab in user
            const existingUser= await User.findById(req.user.id,function(err,user){
                if (err) { res.send("Error did occurred") };

                if (user) {
                    const binder = user
                    .binder_arr_obj.id('5a56b2782962901f9c0fe0fd') //req.body.binder_arr_obj_id
                    if(binder){
                        tab= new Tab();
                        tab.page_arr_obj.push(new Page());
                        tab.page_arr_obj[0].video.push(new Video());
                        tab.page_arr_obj[0].notes.document.nodes.push(new Note());
                        binder.tab_arr_obj.push(tab);

                        user.save();
                        res.send(user);
                    }else{res.send('wrong path')}
                    
                }else {
                res.send("Error can't find user")
                }
            })
        })
        .delete('/api/tab', async (req, res) => {
            const existingUser= await User.findById('5a569b34da2d998e141c38b2',function(err,user){
                if (err) { res.send("Error did occurred") };

                if (user) {
                    const tab = user
                    .binder_arr_obj.id('5a569b34da2d998e141c38ad') //req.body.binder_arr_obj_id
                    .tab_arr_obj.id('5a56b09af2218b0b10dbd8a0')  //req.body.tab_arr_obj_id
                    
                    tab.remove();
                    user.save();
                    res.send(user);
                    
                }else {
                res.send("Error can't find user")
                }
            })
        })
        .put('/api/tab', async (req, res) => {

            const existingUser= await User.findById('5a569b34da2d998e141c38b2', function (err, user){
                if (err) { res.send("Error did occurred")};

                if (user) {
                    const tab = user
                    .binder_arr_obj.id('5a569b34da2d998e141c38ad') //req.body.binder_arr_obj_id
                    .tab_arr_obj.id('5a569b34da2d998e141c38ae')  //req.body.tab_arr_obj_id
                    
                    tab.tab_color = req.body.tab_color || tab.tab_color;
                    tab.tab_name = req.body.tab_name || tab.tab_name;
                    
            
                    user.save();
                    res.send(user);
                }else {
                res.send("Error can't find user")
                }
                res.end();
        
            });
        });

    // For Page //

    app
        .get('/api/page', async (req,res)=>{
            const existingUser= await User.findOne({ 'googleId': "103970352561814947806" }, function (err, user){
                if (err) { res.send("Error did occurred") };

                if (user) {
                    res.send(user);
                }else {
                res.send("Error can't find user")
                }
                res.end();
        
            });
        })
        .post('/api/page', async (req, res) => {
            //create new page in user
            const existingUser= await User.findById('5a56b2782962901f9c0fe102',function(err,user){
                if (err) { res.send("Error did occurred") };

                if (user) {
                    const tab = user
                    .binder_arr_obj.id('5a56b64553169388cce1767f') //req.body.binder_arr_obj_id
                    .tab_arr_obj.id('5a56b64553169388cce17680')  //req.body.tab_arr_obj_id
                    if(tab){
                        let page = new Page()
                        page.video.push(new Video());
                        page.notes.document.nodes.push(new Note());
                        tab.page_arr_obj.push(page);

                        user.save();
                        res.send(user);
                    }else{res.send('wrong path')}
                    
                }else {
                res.send("Error can't find user")
                }
            })
        })
        .delete('/api/page', async (req, res) => {
            //delete page
            const existingUser= await User.findById('5a569b34da2d998e141c38b2',function(err,user){
                if (err) { res.send("Error did occurred") };

                if (user) {
                    const page = user
                    .binder_arr_obj.id('5a569b34da2d998e141c38ad') //req.body.binder_arr_obj_id
                    .tab_arr_obj.id('5a569b34da2d998e141c38ae')  //req.body.tab_arr_obj_id
                    .page_arr_obj.id('5a56ac350fc70b12841bf53f'); //req.body.page_arr_obj_id
                    
                    page.remove();
                    user.save();
                    res.send(user);
                    
                }else {
                res.send("Error can't find user")
                }
            })
        })
        .put('/api/page', async (req,res)=>{
            const existingUser= await User.findById('5a569b34da2d998e141c38b2',function(err,user){
                if (err) { res.send("Error did occurred") };

                if (user) {
                    const page = user
                    .binder_arr_obj.id('5a569b34da2d998e141c38ad') //req.body.binder_arr_obj_id
                    .tab_arr_obj.id('5a569b34da2d998e141c38ae')  //req.body.tab_arr_obj_id
                    .page_arr_obj.id('5a569b34da2d998e141c38af'); //req.body.page_arr_obj_id
                    
                    page.page_color = req.body.page_color || page.page_color;
                    page.page_name = req.body.page_name || page.page_name;
                    
            
                    user.save();
                    res.send(user);
                    
                }else {
                res.send("Error can't find user")
                }
                // res.end();
            })

        });

//  video
    // app
    //     .get()
    //     .post()
    //     .delete()
    //     .put();


}