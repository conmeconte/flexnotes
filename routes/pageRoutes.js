const mongoose =require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
let dummyData = require('../dummyData/backEndDummyData');
//Restful/ CRUD operation 

module.exports = app => {
    app.get(':user/binder/tab/page/:id', requireLogin, async (req,res)=>{
        //get info of current page
    }); 
    app.post(':user/binder/tab/page', requireLogin, async (req,res)=>{
        //create new page in tab
    }); 
    app.post(':user/binder/tab', requireLogin, async (req,res)=>{
        //create new tab in binder
    }); 
    app.post(':user/binder', requireLogin, async (req,res)=>{
        //create new binder in user
    }); 
    
    
}