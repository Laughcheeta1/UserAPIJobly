const OperationUnsuccessfulException = require('../Errors/OperationUnsuccessfulException');
const ProviderNotFoundException = require('../Errors/ProviderNotFoundException');

// This is for getting like active services, etc.
const getServicesMethods = (db) => {
    // TODO: the ContractApi should be the one that adds a service the provider has joined to the list of joined services.
    // That way we can make sure that service is indeed added to the list and everything is consistent.
    const getJoinedOfferingsProvider = async (db, dbId) => {
        const services = await db.collection('Provider').findOne(
            { "dbId" : dbId }, 
            { 
                "projection": 
                { "joined_offerings" : 1 } 
            });
        return services;
    };

    const getMadeOfferingsEmployer = async (db, dbId) => {
        const services = await db.collection('Employer').findOne(
            { "dbId" : dbId }, 
            { 
                "projection": 
                { "made_offerings" : 1 } 
            });
        return services;
    }

    return {    
        getJoinedOfferingsProvider,
        getMadeOfferingsEmployer
    };
};

module.exports = getServicesMethods;