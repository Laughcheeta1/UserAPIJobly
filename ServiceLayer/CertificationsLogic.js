const InvalidCertificationException = require('../Errors/InvalidCertificationException');

const getCertificationLogic = (repository) => {
    const getOutsideCertificationsProvider = async (dbId) => {
        return await repository.getOutsideCertificationsProvider(dbId);
    };

    const addOutsideCertificationProvider = async (dbId, certification) => {
        if (!certification.name)
            throw new InvalidCertificationException("No name for the certification was provided");

        if (!certification.issuer)
            throw new InvalidCertificationException("No issuer for the certification was provided");

        if (!certification.description)
            certification.description = "";

        return await repository.addOutsideCertificationProvider(dbId, certification);
    };

    return {
        getOutsideCertificationsProvider,
        addOutsideCertificationProvider
    };
};

module.exports = getCertificationLogic;
