
global.config = require('./index.js');
const mongodb = require('mongodb');

let mongodbClient;
let db;

// Better use async await when using this function.
// eg. async function get() {
//     const db = await dbConnect();
// }
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
                    
                    // We close the mongodb connection upon exiting the runtime nodejs.
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