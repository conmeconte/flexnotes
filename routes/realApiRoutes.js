const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const { User, Binder, Tab, Page, Note, Video } = require('../models');

//Restful/ CRUD operation 

module.exports = (app) => {     
    app.get('/', (req, res) => {
        res.send('Homepage')
    })
    app.get('/api/userInfo',  (req, res) => {
        res.send(req.user);
    });
    //Front Error Handler//
    app.post('/api/errors', requireLogin, async(req, res)=>{
        const existingUser= await User.findById(req.user.id);
        if(!existingUser){
            res.send("Error can't find user");
        }else{
            const frontErrorLog= {Date: new Date().toLocaleString, Error: req.body.errorLog};
            fs.appendFile('./errorLogs/frontEnd.log', JSON.stringify(frontErrorLog) + '\n', function (err) {
                if (err) throw err; 
                console.log('Front End Log Updated!');
             });

        }
    });

    // For Binder //
    app
        .get('/api/binder', requireLogin,  async (req, res) => {
            //give binder data 
            const existingUser= await User.findById(req.user.id, function(err){if(err){return res.send('error')}});
            if(existingUser){
                res.send(existingUser);
            }else{
                res.send("Error can't find user")
            }
        })
        .post('/api/binder', requireLogin, async (req, res) => {
            const existingUser= await User.findById(req.user.id, function(err){if(err){return res.send('error')}});
            if(existingUser){
                    const defaultBinder = new Binder();
                    defaultBinder.tab_arr_obj.push(new Tab());
                    defaultBinder.tab_arr_obj[0].page_arr_obj.push(new Page({ page_date: new Date().toLocaleString() }));
                    defaultBinder.tab_arr_obj[0].page_arr_obj[0].video.push(new Video({ videoInfo: 'No Info' }));
                    existingUser.binder_arr_obj.push(defaultBinder);
                    existingUser.save()
                    res.send(existingUser);    

            }else{
                res.send("Error did occurred");
            }
                
        })
        .delete('/api/binder', requireLogin,  async (req, res) => {
            const existingUser= await User.findById(req.user.id,function(err){if(err){return res.send('error')}});
            if (existingUser) {
                const binder = existingUser
                .binder_arr_obj.id(req.query.binderID) 
                binder.remove();
                existingUser.save();
                res.send(existingUser.binder_arr_obj);
                
            }else {
            res.send("Error can't find user")
            }
        })
        .put('/api/binder', requireLogin, async (req, res) => {
            // update binder

            const existingUser= await User.findById(req.user.id, function (err){if(err){return res.send('error')}});    
            if (existingUser) {
                const binder = existingUser
                .binder_arr_obj.id(req.body.binderID)
                
                binder.binder_color = req.body.binder_color || binder.binder_color;
                binder.binder_name = req.body.binder_name || binder.binder_name;
                
        
                existingUser.save();
                res.send(existingUser.binder_arr_obj);
            }else {
            res.send("Error can't find user")
            }
        
            });
    // For Tab//
    // For Tab//
    // For Tab//
    // For Tab//
    app
        .get('/api/tab', requireLogin, async (req, res) => {
            const existingUser= await User.findById(req.user.id, function (err){if(err){return res.send('error')}});
                if (existingUser) {
                    res.send(existingUser.binder_arr_obj);
                }else {
                res.send("Error can't find user")
                }
        
        })
        .post('/api/tab', requireLogin, async (req, res) => {
            //create new tab in user
            const existingUser= await User.findById(req.user.id,function(err,user){if(err){return res.send('error')}});
                if (existingUser) {
                    const binder = existingUser
                    .binder_arr_obj.id(req.body.binderID)
                    if(binder){
                        tab= new Tab();
                        tab.page_arr_obj.push(new Page());
                        tab.page_arr_obj[0].video.push(new Video());
                        binder.tab_arr_obj.push(tab);

                        existingUser.save();
                        res.send(binder);
                    }else{res.send('Binder Array does not exist')}
                    
                }else {
                res.send("Error can't find user")
                }
        })
        .delete('/api/tab', requireLogin, async (req, res) => {
            const existingUser= await User.findById(req.user.id,function(err,user){if(err){return res.send('error')}});

                if (existingUser) {
                    const tab = existingUser
                    .binder_arr_obj.id(req.query.binderID) 
                    .tab_arr_obj.id(req.query.tabID) 

                    const binder = existingUser
                    .binder_arr_obj.id(req.query.binderID)
                    
                    tab.remove();
                    existingUser.save();
                    res.send(binder);
                    
                }else {
                res.send("Error can't find user")
                }
        })
        .put('/api/tab', requireLogin, async (req, res) => {

            const existingUser= await User.findById(req.user.id, function (err){if(err){return res.send('error')}});
                if (existingUser) {
                    const tab = existingUser
                    .binder_arr_obj.id(req.body.binderID) 
                    .tab_arr_obj.id(req.body.tabID) 
                    
                    tab.tab_color = req.body.tab_color || tab.tab_color;
                    tab.tab_name = req.body.tab_name || tab.tab_name;
                    
                    const binder = existingUser
                    .binder_arr_obj.id(req.body.binderID);

                    existingUser.save();
                    res.send(existingUser.binder_arr_obj);
                }else {
                res.send("Error can't find user")
                }
        
        });

    // For Page //

    app
        .get('/api/page', requireLogin, async (req,res)=>{
            const existingUser= await User.findById(req.user.id, function (err){if(err){return res.send('error')}});
                if (existingUser) {
                    res.send(existingUser);
                } else {
                res.send("Error can't find user")
                }
        })
        .post('/api/page', requireLogin, async (req, res) => {
            //create new page in user
            const existingUser= await User.findById(req.user.id,function(err,user){if(err){return res.send('error')}});
                if (existingUser) {
                    const tab = existingUser
                    .binder_arr_obj.id(req.body.binderID) 
                    .tab_arr_obj.id(req.body.tabID)  
                    if(tab){
                        let page = new Page()
                        page.video.push(new Video());
                        tab.page_arr_obj.push(page);
                        const binder = existingUser
                        .binder_arr_obj.id(req.body.binderID);

                        existingUser.save();
                        res.send(binder);
                    }else{res.send('Binder/tab id does not exist')}
                    
                }else {
                res.send("Error can't find user")
                }
        })
        .delete('/api/page', requireLogin, async (req, res) => {
            //delete page
            const existingUser= await User.findById(req.user.id,function(err,user){if(err){return res.send('error')}});
                if (existingUser) {
                    const page = existingUser
                    .binder_arr_obj.id(req.query.binderID) 
                    .tab_arr_obj.id(req.query.tabID)  
                    .page_arr_obj.id(req.query.pageID); 

                    const binder= existingUser
                    .binder_arr_obj.id(req.query.binderID)
                    
                    page.remove();
                    existingUser.save();
                    res.send(binder);
                }else {
                res.send("Error can't find user")
                }
        })
        .put('/api/page', requireLogin, async (req,res)=>{
            const existingUser= await User.findById(req.user.id,function(err){if(err){return res.send('error')}});
                if (existingUser) {
                    const page = existingUser
                    .binder_arr_obj.id(req.body.binderID)
                    .tab_arr_obj.id(req.body.tabID)
                    .page_arr_obj.id(req.body.pageID); 
                    
                    page.page_color = req.body.page_color || page.page_color;
                    page.page_name = req.body.page_name || page.page_name;
                    page.lecture_slides= req.body.lecture_slides || page.lecture_slides; 
                    page.panel_dimensions.top_left_panel_height= req.body.top_left_panel_height || page.panel_dimensions.top_left_panel_height;
                    page.panel_dimensions.top_left_panel_width= req.body.top_left_panel_width || page.panel_dimensions.top_left_panel_width;
                    page.panel_dimensions.top_right_panel_height= req.body.top_right_panel_height || page.panel_dimensions.top_right_panel_height;
                    page.panel_dimensions.number_of_panels= req.body.number_of_panels || page.panel_dimensions.number_of_panels;
                    
                    existingUser.save();
                    res.send(existingUser.binder_arr_obj);
                    
                }else {
                res.send("Error can't find user")
                }
        });

 //video//
    app
        .post('/api/video', requireLogin, async (req,res)=>{
            const existingUser= await User.findById(req.user.id, (err)=>{if(err){return res.send('error')}});
                if (existingUser) {
                    const page = existingUser
                    .binder_arr_obj.id(req.body.binderID)
                    .tab_arr_obj.id(req.body.tabID)  
                    .page_arr_obj.id(req.body.pageID)
                    if(page){
                        
                        page.video[0]=new Video({videoId: req.body.video.videoId, videoURL: req.body.video.videoUrl, videoTitle: req.body.video.videoTitle});

                        existingUser.save();
                        res.send(page);
                    }else{res.send('wrong path')} 
                    
                }else {
                res.send("Error can't find user")
                }
        })
        .delete('/api/video', requireLogin, async (req,res)=>{
            const existingUser= await User.findById(req.user.id, (err,user)=>{if(err){return res.send('error')}});
                if (existingUser) {
                    const video = existingUser
                    .binder_arr_obj.id(req.query.binderID)
                    .tab_arr_obj.id(req.query.tabID)  
                    .page_arr_obj.id(req.query.pageID)
                    .video.id(req.query.videoID)
                    if(video){
                        video.remove();
                        existingUser.save();
                        res.send(existingUser);
                    }else{res.send('binder/tab/page id does not exist')}
                    
                }else {
                    res.status(500);
                    res.render('error', {error: err}).send("Error can't find user")
                }
        })
        .put('/api/video', requireLogin, async (req,res)=>{
            const existingUser= await User.findById(req.user.id, (err,user)=>{if(err){return res.send('error')}});
                if (existingUser) {
                    const video = existingUser
                    .binder_arr_obj.id(req.body.binderID)
                    .tab_arr_obj.id(req.body.tabID)  
                    .page_arr_obj.id(req.body.pageID)
                    .video.id(req.body.videoID)
                    if(video){
                        video.vid_url= req.body.vid_url || video.vid_url;
                        video.videoInfo= req.body.videoInfo || video.videoInfo;
                        existingUser.save();
                        res.send(existingUser);
                    }else{res.send('path ids provided does not work')}
                    
                }else {
                    res.status(500);
                    res.render('error', {error: err}).send("Error can't find user")
                }
        });

//note//
app.put('/api/note', requireLogin, async (req,res)=>{
        const existingUser= await User.findById(req.user.id, (err,user)=>{if(err){return res.send('error')}});
            if (existingUser) {
                const page = existingUser
                .binder_arr_obj.id(req.body.binderID)
                .tab_arr_obj.id(req.body.tabID)  
                .page_arr_obj.id(req.body.pageID)
                if(page){
                    page.notes.document= req.body.document || page.notes.document;

                    existingUser.save();
                    res.send(page);
                }else{res.send('wrong path')}
                
            }else {
            res.send("Error can't find user")
            }
    });


}




