const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const { User, Binder, Tab, Page, Note, Video } = require('../models');

//Restful/ CRUD operation 

module.exports = (app, dummyData) => {
    app.get('/', (req, res) => {
        res.send('Homepage')
    })
    app.get('/api/userInfo', requireLogin, (req, res) => {

        res.send(req.user);
    })
    app.get('/api/dummyData', requireLogin, (req, res) => {
        res.send(dummyData);

    })
    // app.get('/dummyData', (req,res)=>{
    //     if(req.user.userName=== 'JOhn Hong'){
    //         dummyData.binder_arr_obj.forEach(ele=>{
    //             if(ele.binder_id === 1){
    //                 console.log('if passed')
    //                 ele.binder_name= "binder name changed";
    //                 res.send(dummyData);
    //             }
    //         })
    //     }


    // })
    app.post('/api/dummyData', (req, res) => {


        res.send(dummyData);
    })

    app.get('/api', requireLogin, async (req, res) => {
        //pull entire user obj

    })
    // For Binder //
    app
        .get('/api/binder', requireLogin, async (req, res) => {
            //give binder data
            //userId accessible via req.param.userId?
            console.log('you reached here', req.user)
        })
        .post('/api/binder', async (req, res) => {
            //create new binder in user
            console.log("inside api binder rout ", req.body);
            const existingUser = await User.findOne({ 'googleId': "103970352561814947806" }, function (err, user) {
                //if no match .find return [], and .findOne returns null in document(in this case user)
                if (err) { res.send("Error did occurred") };

                if (user) {
                    const defaultBinder = new Binder();
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
            //delete binder
            const existingUser = await User.findOne({ 'googleId': "103970352561814947806" }, function (err, user) {
                if (err) { res.send("Error Occurred") };
                if (user) {
                    user.binder_arr_obj.pop();
                    res.send(user.save());
                    console.log('a binder has been deleted');
                } else {
                    res.status(404).end();
                }

            })
            res.end();
        })
        .put('/api/binder', async (req, res) => {
            // update binder
            const existingUser = await User.findOne({ 'googleId': "103970352561814947806" }, function (err, user) {
                if (err) { res.send("Error Occurred") }
                if (user) {
                    // user.binder_arr_obj[0].binder_name=req.body.testing; //nothing on req.body...
                    user.binder_arr_obj[0].binder_name = req.body.newBinderName;
                    user.save((err, data) => {
                        if (err) { console.log('failed to save', err) }
                        else {
                            res.send(data);
                            console.log('saved')
                        }; //data shows change, but database not changed...

                    });
                } else {
                    res.status(404).end();
                    console.log('user not found');
                }

            })
            res.end();
        })
    // For Tab//
    app.get('/api/tab', requireLogin, async (req, res) => {
        //give tab data
        // www.chung.com/user/1/binder/4/tab/3
    });
    app.post('/api/tab', async (req, res) => {
        //create new tab in user
        const existingUser = await User.findOne({ 'googleId': "103970352561814947806" }, function (err, user) {

            if (err) { res.send("Error Occurred") }

            if (user) {
                const defaultTab = new Tab();
                // const prevBinderId= user.binder_arr_obj[binder_arr_obj.length-1].binder_id; 
                // defaultBinder.binder_id= 
                defaultTab.page_arr_obj.push(new Page());
                defaultTab.page_arr_obj[0].video.push(new Video({ videoInfo: 'No Info' }));
                defaultTab.page_arr_obj[0].notes.document.nodes.push(new Note());
                user.binder_arr_obj[0].tab_arr_obj.push(defaultTab);  //binder_arr_obj[num] num should be whichever binder that called the method, might need to search for id number
                user.save((err, data) => {
                    if (err) {
                        console.log('some error');
                    }
                    if (data) {
                        res.send(data);
                        console.log("User has a new tab and is now saved");
                    } else {
                        console.log('user not found');
                    }
                })
            } else {
                res.send("Error can't find user")
            }
        });

    });
    app.delete('/api/tab', requireLogin, async (req, res) => {
        //delete tab
    });
    app.put('/api/tab', requireLogin, async (req, res) => {
        // update tab
    });

    // For Page //

    app.get('/api/page', async (req,res)=>{
        console.log(req.user);
        res.send(dummyData);
    });
    app.post('/api/page', async (req, res) => {
        //create new page in user
    });
    app.delete('/api/page', async (req, res) => {
        //delete page
    });
    app.put('/api/page', async (req, res) => {
        // update page
        console.log(req.body);

        for(var ele in req.body){
            if (ele === 'lecture_slides'){
                console.log(req.body.lecture_slides.lec_id);
                fakeData.binder_arr_obj[0].tab_arr_obj[0].page_arr_obj[0].lecture_slides.lec_id = req.body.lecture_slides.lec_id;
                res.send(fakeData);
            }
        }
    });





}