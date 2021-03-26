
global.config = require('./index.js');
const mongodb = require('mongodb');

let mongodbClient;
let db;

function dbConnect() {
    return new Promise((resolve, reject) => {
        if (db) {
            resolve(db);
        } else {
            mongodb.MongoClient.connect(global.config.mongodbUrl + global.config.databaseName, (err, client) => {
                if (err) {
                    console.error('Error connecting to the MongoDB URL: ' + global.config.mongodbUrl + global.config.databaseName);
                    reject(err);
                } else {
                    mongodbClient = client;
                    db = mongodbClient.db(global.config.databaseName);
                    
                    process.on('exit', () => {
                        dbClose();
                    });
                    resolve(db);
                }
            });
        }
    });
}

function dbClose() {
    if (mongodbClient && mongodbClient.isConnected()) {
        mongodbClient.close();
    }
}

exports.dbConnect = dbConnect;