const mongodb = require('../config/mongodb.js');


module.exports.testGetDb = async () => {
    const db = await mongodb.dbConnect();
    return db;
}