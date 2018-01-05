const mongoose =require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
let dummyData = require('../dummyData/backEndDummyData');

//Restful/ CRUD operation 

module.exports = app => {
    app.get('/', (req,res)=>{
        res.send('Homepage')
    })
// For Binder //
    app.get('/:userId/:binderId/update', requireLogin, async (req,res)=>{
        //give binder data
        //userId accessible via req.param.userId?
    }); 
    app.post('/:userId/:binderId/update', requireLogin, async (req,res)=>{
        //create new binder in user
    }); 
    app.delete('/:userId/:binderId/update', requireLogin, async (req,res)=>{
        //delete binder
    }); 
    app.put('/:userId/:binderId/update', requireLogin, async (req,res)=>{
        // update binder
    }); 
// For Tab//
    app.get('/:userId/:binderId/:tabId/update', requireLogin, async (req,res)=>{
        //give tab data
    }); 
    app.post('/:userId/:binderId/:tabId/update', requireLogin, async (req,res)=>{
        //create new tab in user
    }); 
    app.delete('/:userId/:binderId/:tabId/update', requireLogin, async (req,res)=>{
        //delete tab
    }); 
    app.put('/:userId/:binderId/:tabId/update', requireLogin, async (req,res)=>{
        // update tab
    }); 

// For Page //

    app.get('/:userId/:binderId/:tabId/:pageId/update', requireLogin, async (req,res)=>{
        //give page data
    }); 
    app.post('/:userId/:binderId/:tabId/:pageId/update', requireLogin, async (req,res)=>{
        //create new page in user
    }); 
    app.delete('/:userId/:binderId/:tabId/:pageId/update', requireLogin, async (req,res)=>{
        //delete page
    }); 
    app.put('/:userId/:binderId/:tabId/:pageId/update', requireLogin, async (req,res)=>{
        // update page
    }); 



    
    
}