const mongodb = require('../../config/mongodb.js');

describe('test dbConnect()', () => {
    it('Should receive promise resolve & match the expected database name', () => {
        return expect(mongodb.dbConnect()).resolves.toEqual(expect.objectContaining({databaseName: "savim"}));
    });
});