const User = require('../models/user');

exports.addUser = function(id, name){
    const newUser = new User({
        googleId: id,
        username: name
    });

    console.log('New User:', newUser);

    newUser.save(function(err){
        if(err) return res.send('<h1>Error</h1>');

        res.send('<h1>New user created</h1>');
    });


}

exports.getUser = function(req, res, next){
    User.findById('5a557a0c7b71075f968f0983').then(function(user, err){
        if(err) return res.send('<h1>Error</h1>');

        res.send(user);
    });
}

exports.addBinder = function(req, res, next){
    User.findById('5a557a0c7b71075f968f0983').then(function(user, err){
        if(err) return res.send('<h1>Error</h1>');

        user.binders.push({
            binder_name: new Date().toLocaleString()
        });

        user.save(function(err){
            if(err) return res.send('<h1>Error</h1>');

            res.send(user);
        });
    });
}

exports.addTab = function(req, res, next){
    User.findById('5a557a0c7b71075f968f0983').then(function(user, err){
        if(err) return res.send('<h1>Error</h1>');

        const binder = user.binders.id('5a557e9350f28e6019423369');

        binder.tabs.push({
            tab_name: 'Tab ' + new Date().toLocaleString()
        });

        user.save(function(err){
            if(err) return res.send('<h1>Error</h1>');

            res.send(user);
        });
    });
}

exports.addPage = function(req, res, next){
    User.findById('5a557a0c7b71075f968f0983').then(function(user, err){
        if(err) return res.send('<h1>Error</h1>');

        const tab = user
            .binders.id('5a557e9350f28e6019423369')
            .tabs.id('5a55879fc94b55614a3baeb3');

        tab.pages.push({
            page_color: 'blue',
            page_date: new Date().toLocaleString(),
            page_name: 'Page ' + new Date().toLocaleString()
        });

        user.save(function(err){
            if(err) return res.send('<h1>Error</h1>');

            res.send(user);
        });
    });
}

// 5a558ae2206a4b61c785a630

exports.editPage = function(req, res, next){
    User.findById('5a569b34da2d998e141c38b2').then(function(user, err){
        if(err) return res.send('<h1>Error</h1>');

        const page = user
            .binders.id('5a569b34da2d998e141c38ad')
            .tabs.id('5a569b34da2d998e141c38ae')
            .pages.id('5a569b34da2d998e141c38af');

        
        page.page_color = req.body.page_color || page.page_color;
        page.page_name = req.body.page_name || page.page_name;
        

        user.save(function(err){
            if(err) return res.send('<h1>Error</h1>');

            res.send(user);
        });
    });
}

exports.addNote = function(req, res, next){
    User.findById('5a557a0c7b71075f968f0983').then(function(user, err){
        if(err) return res.send('<h1>Error</h1>');

        const page = user
            .binders.id('5a557e9350f28e6019423369')
            .tabs.id('5a55879fc94b55614a3baeb3')
            .pages.id('5a558a77f76d5261bdb09a86');

        page.notes.push({
            title: 'Note ' + new Date().toLocaleString(),
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, nisi!'
        });

        user.save(function(err){
            if(err) return res.send('<h1>Error</h1>');

            res.send(user);
        });
    });
}

exports.editNote = function(req, res, next){
    
    User.findById('5a557a0c7b71075f968f0983').then(function(user, err){
        if(err) return res.send('<h1>Error</h1>');

        const note = user
            .binders.id('5a557e9350f28e6019423369')
            .tabs.id('5a55879fc94b55614a3baeb3')
            .pages.id('5a558a77f76d5261bdb09a86')
            .notes.id('5a55b1f09154bd625330c670');

        note.title = req.query.title || note.title;
        note.content = req.query.content || note.content;

        user.save(function(err){
            if(err) return res.send('<h1>Error</h1>');

            res.send(user);
        });
    });
}
