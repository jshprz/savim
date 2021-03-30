var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


var user = require('../models/users');

module.exports = function (config) {
    // console.log(config.db);
    mongoose.connect(config.db, function (err) {
        var admin = new mongoose.mongo.Admin(mongoose.connection.db);
        admin.buildInfo(function (err, info) {
            console.log(info.version);
        });
    });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        


    });

};

