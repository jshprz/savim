var port = process.env.PORT || 8090;

const config = {
    mongodbUrl: process.env.MONGO_DB_URL || 'mongodb://localhost:27017/',
    databaseName: process.env.MONGO_DB_NAME || 'savim',
    port: port,
    hostname: '127.0.0.1'
};

require('./mongoose')(config);

require('./auth');

module.exports = config;


