repositoryInitializer = require('../DatabaseLayer/RegisterRepository');

const BasicInfoLogic = require('./BasicInfoLogic');
const ExtraInfoLogic = require('./ExtraInfoLogic');
const CertificationsLogic = require('./CertificationsLogic');
const ReviewsLogic = require('./ReviewsLogic');
const ServicesLogic = require('./ServicesLogic');

const initializer = async () => {
    const repository = await repositoryInitializer();

    return {
        ...BasicInfoLogic(repository),
        ...ExtraInfoLogic(repository),
        ...CertificationsLogic(repository),
        ...ReviewsLogic(repository),
        ...ServicesLogic(repository)
    }
};

module.exports = initializer;