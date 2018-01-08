const mongoose =require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
let dummyData = require('../dummyData/backEndDummyData');

//Restful/ CRUD operation 

module.exports = app => {
    app.get('/', (req,res)=>{
        res.send('Homepage')
    })
    app.get('/userInfo', requireLogin, (req,res)=>{
        
        res.send(req.user);
    })
    app.get('/dummyData', requireLogin, (req,res)=>{
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
    app.post('/dummyData', (req,res)=>{
        

        res.send(dummyData);
    })


// For Binder //
    app
    .get('/api/:binderId', requireLogin, async (req,res)=>{
        //give binder data
        //userId accessible via req.param.userId?
        console.log('you reached here', req.user)
    }) 
    .post('/api/:binderId', requireLogin, async (req,res)=>{
        //create new binder in user
    }) 
    .delete('/api/:binderId', requireLogin, async (req,res)=>{
        //delete binder
    }) 
    .put('/api/:binderId', requireLogin, async (req,res)=>{
        // update binder
    }) 
// For Tab//
    app.get('/api/:binderId/:tabId', requireLogin, async (req,res)=>{
        //give tab data
        // www.chung.com/user/1/binder/4/tab/3
    }); 
    app.post('/api/:binderId/:tabId', requireLogin, async (req,res)=>{
        //create new tab in user
    }); 
    app.delete('/api/:binderId/:tabId', requireLogin, async (req,res)=>{
        //delete tab
    }); 
    app.put('/api/:binderId/:tabId', requireLogin, async (req,res)=>{
        // update tab
    }); 

// For Page //

    app.get('/api/:binderId/:tabId/:pageId', requireLogin, async (req,res)=>{
        //give page data
    }); 
    app.post('/api/:binderId/:tabId/:pageId', requireLogin, async (req,res)=>{
        //create new page in user
    }); 
    app.delete('/api/:binderId/:tabId/:pageId', requireLogin, async (req,res)=>{
        //delete page
    }); 
    app.put('/api/:binderId/:tabId/:pageId', requireLogin, async (req,res)=>{
        // update page
    }); 



    
    
}