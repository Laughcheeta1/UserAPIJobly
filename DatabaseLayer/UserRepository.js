const connectDb = require('../db.js');

const initialize = async () => {
    db = await connectDb();

    return {

    };
};


module.exports = initialize