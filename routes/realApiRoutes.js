const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const { User, Binder, Tab, Page, Note, Video } = require('../models');
// const User = require('../controllers/user');
//Restful/ CRUD operation 

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send('Homepage')
    })
    app.get('/api/userInfo', requireLogin, (req, res) => {
        res.send(req.user);
    });


    app.get('/api', requireLogin, async (req, res) => {
        //pull entire user obj
        const existingUser= await User.findById("5a5a63116f98c0bd996baad5",(err,user)=>{
            if(err){console.log('error is ', err)};
            const testingUserpageInfo=user.binder_arr_obj.id('5a5a63116f98c0bd996baad0').tab_arr_obj.id('5a5a63116f98c0bd996baad1')
            .page_arr_obj.id('5a5a63116f98c0bd996baad2')
            console.log('user is ', testingUserpageInfo);
        })

    })
    // For Binder //
    app
        .get('/api/binder', requireLogin, async (req, res) => {
            //give binder data 
            //userId accessible via req.param.userId?
            const existingUser= await User.findById(req.user.id, function (err, user){
            // const existingUser= await User.findById(req.user.id, function (err, user){
                if (err) { res.send("Error did occurred") };

                if (user) {
                    res.send(user);
                }else {
                res.send("Error can't find user")
                }
                res.end();
            })
        })
        .post('/api/binder', requireLogin,  async (req, res) => {
            const existingUser= await User.findById(req.user.id,function(err,user){
            // const existingUser= await User.findById(req.user.id,function(err,user){
                if (err) { res.send("Error did occurred") };
    
                if (user) {
                    const defaultBinder = new Binder();
                    defaultBinder.tab_arr_obj.push(new Tab());
                    defaultBinder.tab_arr_obj[0].page_arr_obj.push(new Page({ page_date: new Date().toLocaleString() }));
                    defaultBinder.tab_arr_obj[0].page_arr_obj[0].video.push(new Video({ videoInfo: 'No Info' }));
                    defaultBinder.tab_arr_obj[0].page_arr_obj[0].notes.document.nodes.push(new Note());
                    user.binder_arr_obj.push(defaultBinder);
                    user.save()
                    res.send(user);
                    
                }else {
                res.send("Error can't find user")
                }
            })

        })
        .delete('/api/binder', requireLogin,  async (req, res) => {
            const existingUser= await User.findById(req.user.id,function(err,user){
            // const existingUser= await User.findById(req.user.id,function(err,user){
                if (err) { res.send("Error did occurred") };
    
                if (user) {
                    const binder = user
                    .binder_arr_obj.id(req.query.binderID) //req.body.binderID
                    binder.remove();
                    user.save();
                    res.send(user.binder_arr_obj);
                    
                }else {
                res.send("Error can't find user")
                }
            })
        })
        .put('/api/binder', requireLogin,  async (req, res) => {
            // update binder

            const existingUser= await User.findById(req.user.id, function (err, user){
            // const existingUser= await User.findById(req.user.id, function (err, user){
            if (err) { res.send("Error did occurred")};
    
                if (user) {
                    const binder = user
                    .binder_arr_obj.id(req.body.binderID) //req.body.binderID
                    
                    binder.binder_color = req.body.binder_color || binder.binder_color;
                    binder.binder_name = req.body.binder_name || binder.binder_name;
                    
            
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
        .get('/api/tab', requireLogin,  async (req, res) => {
            const existingUser= await User.findById(req.user.id, function (err, user){
            // const existingUser= await User.findById(req.user.id, function (err, user){
                if (err) { res.send("Error did occurred")};

                if (user) {
                    const tab = user
                    .binder_arr_obj.id(req.body.binderID) //req.body.binderID
                    .tab_arr_obj.id(req.body.tabID)
                    res.send(tab);
                }else {
                res.send("Error can't find user")
                }
                res.end();
        
            });
        })
        .post('/api/tab', requireLogin,  async (req, res) => {
            //create new tab in user
            const existingUser= await User.findById(req.user.id,function(err,user){
            // const existingUser= await User.findById(req.user.id,function(err,user){
                if (err) { res.send("Error did occurred") };

                if (user) {
                    const binder = user
                    .binder_arr_obj.id(req.body.binderID) //req.body.binderID
                    if(binder){
                        tab= new Tab();
                        tab.page_arr_obj.push(new Page());
                        tab.page_arr_obj[0].video.push(new Video());
                        tab.page_arr_obj[0].notes.document.nodes.push(new Note());
                        binder.tab_arr_obj.push(tab);

                        user.save();
                        res.send(binder);
                    }else{res.send('wrong path')}
                    
                }else {
                res.send("Error can't find user")
                }
            })
        })
        .delete('/api/tab', requireLogin,  async (req, res) => {
            const existingUser= await User.findById(req.user.id,function(err,user){
            // const existingUser= await User.findById(req.user.id,function(err,user){
                if (err) { res.send("Error did occurred") };

                if (user) {
                    const tab = user
                    .binder_arr_obj.id(req.body.binderID) //req.body.binderID
                    .tab_arr_obj.id(req.body.tabID)  //req.body.tabID;

                    const binder = user
                    .binder_arr_obj.id(req.body.binderID)

                    
                    tab.remove();
                    user.save();
                    res.send(binder);
                    
                }else {
                res.send("Error can't find user")
                }
            })
        })
        .put('/api/tab', requireLogin,  async (req, res) => {

            const existingUser= await User.findById(req.user.id, function (err, user){
            // const existingUser= await User.findById(req.user.id, function (err, user){
                if (err) { res.send("Error did occurred")};

                if (user) {
                    const tab = user
                    .binder_arr_obj.id(req.body.binderID) //req.body.binderID
                    .tab_arr_obj.id(req.body.tabID)  //req.body.tabID
                    
                    tab.tab_color = req.body.tab_color || tab.tab_color;
                    tab.tab_name = req.body.tab_name || tab.tab_name;
                    
                    const binder = user
                    .binder_arr_obj.id(req.body.binderID);

                    user.save();
                    res.send(binder);
                }else {
                res.send("Error can't find user")
                }
                res.end();
        
            });
        });

    // For Page //

    app
        .get('/api/page', requireLogin,  async (req,res)=>{
            const existingUser= await User.findById(req.user.id, function (err, user){
            // const existingUser= await User.findById(req.user.id, function (err, user){
                if (err) { res.send("Error did occurred") };

                if (user) {
                    res.send(user);
                }else {
                res.send("Error can't find user")
                }
                res.end();
        
            });
        })
        .post('/api/page', requireLogin,  async (req, res) => {
            //create new page in user
            const existingUser= await User.findById(req.user.id,function(err,user){
            // const existingUser= await User.findById(req.user.id,function(err,user){
                if (err) { res.send("Error did occurred") };

                if (user) {
                    const tab = user
                    .binder_arr_obj.id(req.body.binderID) //req.body.binderID
                    .tab_arr_obj.id(req.body.tabID)  //req.body.tabID
                    if(tab){
                        let page = new Page()
                        page.video.push(new Video());
                        page.notes.document.nodes.push(new Note());
                        tab.page_arr_obj.push(page);

                        const binder = user
                        .binder_arr_obj.id(req.body.binderID);

                        user.save();
                        res.send(binder);
                    }else{res.send('wrong path')}
                    
                }else {
                res.send("Error can't find user")
                }
            })
        })
        .delete('/api/page', requireLogin,  async (req, res) => {
            //delete page
            const existingUser= await User.findById('5a569b34da2d998e141c38b2',function(err,user){
                if (err) { res.send("Error did occurred") };

                if (user) {
                    const page = user
                    .binder_arr_obj.id(req.body.binderID) //req.body.binderID
                    .tab_arr_obj.id(req.body.tabID)  //req.body.tabID
                    .page_arr_obj.id(req.body.pageID); //req.body.pageID
                    
                    page.remove();
                    user.save();
                    res.send(user);
                    
                }else {
                res.send("Error can't find user")
                }
            })
        })
        .put('/api/page', requireLogin,  async (req,res)=>{
            const existingUser= await User.findById(req.user.id,function(err,user){

                if (err) { res.send("Error did occurred") };

                if (user) {
                    const page = user
                    .binder_arr_obj.id(req.body.binderID) //req.body.binderID
                    .tab_arr_obj.id(req.body.tabID)  //req.body.tabID
                    .page_arr_obj.id(req.body.pageID); //req.body.pageID
                    
                    page.page_color = req.body.page_color || page.page_color;
                    page.page_name = req.body.page_name || page.page_name;
                    page.lecture_slides= req.body.lecture_slides || page.lecture_slides; 
                    
            
                    user.save();
                    res.send(user);
                    
                }else {
                res.send("Error can't find user")
                }
                // res.end();
            })

        });

 //video//
    app
        .post('/api/video', requireLogin,  async (req,res)=>{
            const existingUser= await User.findById(req.user.id, (err,user)=>{
            // const existingUser= await User.findById(req.user.id, (err,user)=>{
                if(err){ res.send('Error')}
                if (user) {
                    const page = user
                    .binder_arr_obj.id(req.body.binderID)
                    .tab_arr_obj.id(req.body.tabID)  
                    .page_arr_obj.id(req.body.pageID)
                    if(page){
                        
                        page.video[0]=new Video({videoId: req.body.video.videoId, videoURL: req.body.video.videoUrl, videoTitle: req.body.video.videoTitle});

                        user.save();
                        console.log(user);
                        res.send(page);
                    }else{res.send('wrong path')} 
                    
                }else {
                res.send("Error can't find user")
                }
            })
        })
        .delete('/api/video', requireLogin,  async (req,res)=>{
            const existingUser= await User.findById(req.user.id, (err,user)=>{
            // const existingUser= await User.findById(req.user.id, (err,user)=>{
                if(err){ res.send('Error')}
                if (user) {
                    const video = user
                    .binder_arr_obj.id(req.body.binderID)
                    .tab_arr_obj.id(req.body.tabID)  
                    .page_arr_obj.id(req.body.pageID)
                    .video.id(req.body.videoID)
                    if(video){
                        video.remove();
                        user.save();
                        res.send(user);
                    }else{res.send('wrong path')}
                    
                }else {
                    res.status(500);
                    res.render('error', {error: err}).send("Error can't find user")
                }
            })
        })
        .put('/api/video', requireLogin,  async (req,res)=>{
            const existingUser= await User.findById(req.user.id, (err,user)=>{
            // const existingUser= await User.findById(req.user.id, (err,user)=>{
                if(err){ res.send('Error')}
                if (user) {
                    const video = user
                    .binder_arr_obj.id(req.body.binderID)
                    .tab_arr_obj.id(req.body.tabID)  
                    .page_arr_obj.id(req.body.pageID)
                    .video.id(req.body.videoID)
                    if(video){
                        video.vid_url= req.body.vid_url || video.vid_url;
                        video.videoInfo= req.body.videoInfo || video.videoInfo;
                        user.save();
                        res.send(user);
                    }else{res.send('wrong path')}
                    
                }else {
                    res.status(500);
                    res.render('error', {error: err}).send("Error can't find user")
                }
            })
        });

//note//
app
    .post('/api/note', requireLogin,  async (req,res)=>{
        const existingUser= await User.findById(req.user.id, (err,user)=>{
        // const existingUser= await User.findById(req.user.id, (err,user)=>{
            if(err){ res.send('Error')}
            if (user) {
                const notes = user
                .binder_arr_obj.id(req.body.binderID)
                .tab_arr_obj.id(req.body.tabID)  
                .page_arr_obj.id(req.body.pageID)
                if(notes){
                    page.notes.nodes.push(req.body.notesNode);


                    user.save();
                    res.send(notes);
                }else{res.send('wrong path')}
                
            }else {
            res.send("Error can't find user")
            }
        })
    })
    // .delete('/api/note', async (req,res)=>{
    //     const existingUser= await User.findById(req.body.id, (err,user)=>{
    //     // const existingUser= await User.findById(req.user.id, (err,user)=>{
    //         if(err){ res.send('Error')}
    //         if (user) {
    //             const video = user
    //             .binder_arr_obj.id(req.body.binderID)
    //             .tab_arr_obj.id(req.body.tabID)  
    //             .page_arr_obj.id(req.body.pageID)
    //             .video.id(req.body.videoID)
    //             if(video){
    //                 video.remove();
    //                 user.save();
    //                 res.send(user);
    //             }else{res.send('wrong path')}
                
    //         }else {
    //             res.status(500);
    //             res.render('error', {error: err}).send("Error can't find user")
    //         }
    //     })
    // })
    // .put('/api/note', async (req,res)=>{
    //     const existingUser= await User.findById(req.body.id, (err,user)=>{
    //     // const existingUser= await User.findById(req.user.id, (err,user)=>{
    //         if(err){ res.send('Error')}
    //         if (user) {
    //             const video = user
    //             .binder_arr_obj.id(req.body.binderID)
    //             .tab_arr_obj.id(req.body.tabID)  
    //             .page_arr_obj.id(req.body.pageID)
    //             .video.id(req.body.videoID)
    //             if(video){
    //                 video.vid_url= req.body.vid_url || video.vid_url;
    //                 video.videoInfo= req.body.videoInfo || video.videoInfo;
    //                 user.save();
    //                 res.send(user);
    //             }else{res.send('wrong path')}
                
    //         }else {
    //             res.status(500);
    //             res.render('error', {error: err}).send("Error can't find user")
    //         }
    //     })
    // });




}




