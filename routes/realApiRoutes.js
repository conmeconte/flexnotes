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

        res.send(req.user);
    });


    app.get('/api', async (req, res) => {
        //pull entire user obj
        var id= "5a55b435eb86910ec07e86f2"
        User.findById(id, (err,user)=>{
            res.send(user);
        })

    })
    // For Binder //
    app
        .get('/api/binder', async (req, res) => {
            //give binder data
            //userId accessible via req.param.userId?
            const existingUser= await User.findOne({ 'googleId': "103970352561814947806" }, function (err, user){
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
            //create new binder in user
            console.log("inside api binder rout ", req.body);
            const existingUser = await User.findOne({ 'googleId': "103970352561814947806" }, function (err, user) {
                //if no match .find return [], and .findOne returns null in document(in this case user)
                if (err) { res.send("Error did occurred") };

                if (user) {
                    let idRandomizer= Math.floor((Math.random()* 99999999999) + 00000000000);
                    const defaultBinder = new Binder({binder_id: idRandomizer});
                    // const prevBinderId= user.binder_arr_obj[binder_arr_obj.length-1].binder_id; 
                    // defaultBinder.binder_id= 
                    defaultBinder.tab_arr_obj.push(new Tab());
                    defaultBinder.tab_arr_obj[0].page_arr_obj.push(new Page({ page_color: 'orange' }));
                    defaultBinder.tab_arr_obj[0].page_arr_obj[0].video.push(new Video({ videoInfo: 'No Info' }));
                    defaultBinder.tab_arr_obj[0].page_arr_obj[0].notes.document.nodes.push(new Note());
                    user.binder_arr_obj.push(defaultBinder);
                    res.send(user.save());

                    console.log("User has a new binder and is now saved");
                } else {
                    res.send("Error can't find user")
                }

            });



            res.end();
        })
        .delete('/api/binder', async (req, res) => {
            const existingUser= await User.update({ 'googleId': "103970352561814947806",'binder_arr_obj.binder_id': req.body.binder_id  },
            {'$pull':{'binder_arr_obj':{'binder_id': req.body.binder_id}}},(err,data)=>{
                console.log(data);
                if (err) { res.send("Error Occurred") };
                if (data) {
                    res.send(data);
                    console.log('a binder has been deleted');
                } else {
                    res.status(404).end();
                }
            })
            // const existingUser = await User.findOne({ 'googleId': "103970352561814947806" }, function (err, user) {
            res.end();
        })
        .put('/api/binder', async (req, res) => {
            // update binder
            User.update({"googleId": "103970352561814947806",'binder_arr_obj.binder_id': "B-01" }, {'$set':{"binder_arr_obj.$.binder_name": "Samurai"}
            }, (err, data)=>{
                console.log(err);
                console.log(data);
            })
        
        
            res.end();
        })
        // .put('/api/binder', async (req, res) => {
        //     // update binder

        //     const existingUser = await User.findOneAndUpdate({ googleId: "103970352561814947806" }, {$set: {"binder_arr_obj.$[].binder_name": "Binder uno"}}, {multi:true},function (err, user) {
        //     // const existingUser = await User.findOne({ 'googleId': "103970352561814947806" }, function (err, user) {
        //     // const existingUser = await User.findOne({ 'googleId': "103970352561814947806" },"googleId userName binder_arr_obj", function (err, user) {
        //         // if (err) { res.send("Error Occurred") }
        //         // if (user) {
        //         //     // user.binder_arr_obj[0].binder_name=req.body.testing; //nothing on req.body... => installed two middlewares and problem solved
        //         //     user.binder_arr_obj[0].binder_name = req.body.newBinderName || "untitled binder";
        //         //     user.save((err, data) => {
        //         //         if (err) { console.log('failed to save', err) }
        //         //         else {
        //         //             res.send(data);
        //         //             console.log('saved')
        //         //         }; //data shows change, but database not changed...

        //         //     });
        //         // } else {
        //         //     res.status(404).end();
        //         //     console.log('user not found');
        //         // }
        //         // if(user){console.log(user)};

        //     })
        //     res.end();
        // })



    // For Tab//
    // For Tab//
    // For Tab//
    // For Tab//
    app.get('/api/tab', async (req, res) => {
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
    app.post('/api/tab', async (req, res) => {
        //create new tab in user
        let idRandomizer= Math.floor((Math.random()* 99999999999) + 10000000000);
        const defaultTab = new Tab({tab_id: idRandomizer});
        defaultTab.page_arr_obj.push(new Page());
        defaultTab.page_arr_obj[0].video.push(new Video({ videoInfo: 'No Info' }));
        defaultTab.page_arr_obj[0].notes.document.nodes.push(new Note());
        
        
        const existingUser= await User.update({ 'googleId': req.body.googleId,'binder_arr_obj.binder_id': req.body.binder_id  }, 
        {'$push':{'binder_arr_obj':{"tab_arr_obj":[defaultTab]}}},(err,data)=>{
            if (err) { res.send("Error Occurred") };
            if (data) {
                res.send(data);
                console.log('a binder has been deleted');
            } else {
                res.status(404).end();
            }
        })

        res.end();
    });
    app.delete('/api/tab', async (req, res) => {
        const existingUser= await User.update({ 'googleId': "103970352561814947806",'binder_arr_obj.binder_id': "B-01",'binder_arr_obj.tab_arr_obj.tab_id': "T-01"},
        // {'$pull':{'binder_arr_obj':{'tab_arr_obj':{'tab_id':'T-01'}}}},
        // {'$set':{"binder_arr_obj":{"tab_arr_obj":{'$elemMatch':{'tab_id':"44560363131"}}}}},
        // {'$pull':{"binder_arr_obj.$[outer].tab_arr_obj[inner].tab_name"}},
        (err,data)=>{
            console.log(data);
            console.log(err);
        })
    });
    app.put('/api/tab', async (req, res) => {

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

    app.get('/api/page', async (req,res)=>{
        const existingUser= await User.findOne({ 'googleId': "103970352561814947806" }, function (err, user){
            if (err) { res.send("Error did occurred") };

            if (user) {
                res.send(user);
            }else {
            res.send("Error can't find user")
            }
            res.end();
    
        });
    });
    app.post('/api/page', async (req, res) => {
        //create new page in user
        const existingUser= await User.findById('5a569b34da2d998e141c38b2',function(err,user){
            if (err) { res.send("Error did occurred") };

            if (user) {
                const page = user
                .binder_arr_obj.id('5a569b34da2d998e141c38ad') //req.body.binder_arr_obj_id
                .tab_arr_obj.id('5a569b34da2d998e141c38ae')  //req.body.tab_arr_obj_id
                if(page){
                    page.page_arr_obj.push(new Page());
                    page.page_arr_obj[0].video.push(new Video());
                    page.page_arr_obj[0].notes.document.nodes.push(new Note());
    
                    user.save();
                    res.send(user);
                }
                res.send('wrong path')
                
            }else {
            res.send("Error can't find user")
            }
        })
    });
    app.delete('/api/page', async (req, res) => {
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
    });
    app.put('/api/page', async (req,res)=>{
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





}