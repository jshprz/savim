var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


module.exports = function (config) {
    // console.log global.config.mongodbUrl + global.config.databaseName
    mongoose.connect(
        `${config.mongodbUrl}${config.databaseName}`,
        {            
            useUnifiedTopology: true,
            useNewUrlParser: true
        },
        function (err) {
            var admin = new mongoose.mongo.Admin(mongoose.connection.db);
            admin.buildInfo(function (err, info) {
                console.log(info.version);
            });
        });

    mongoose.set("useCreateIndex", true);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        


    });

};

