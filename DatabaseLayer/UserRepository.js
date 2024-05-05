const connectDb = require('../db.js');

const basicInfoMethods = require('./BasicInfoMethods.js');
const extraInfoMethods = require('./ExtraInfoMethods.js');
const certificationsMethods = require('./CertificationsMethods.js');
const reviewsMethods = require('./ReviewsMethods.js');
const servicesMethods = require('./ServicesMethods.js');

const initialize = async () => {
    db = await connectDb();

    return {
        ...basicInfoMethods(db),
        ...extraInfoMethods(db),
        ...certificationsMethods(db),
        ...reviewsMethods(db),
        ...servicesMethods(db)
    };
};


module.exports = initialize