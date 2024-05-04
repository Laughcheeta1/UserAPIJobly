const OperationUnsuccessfulException = require('../Exceptions/OperationUnsuccessfulException');
const ProviderNotFoundException = require('../Exceptions/ProviderNotFoundException');

const getCertificationsMethods = (db) => {
    const getOutsideCertificationsProvider = async (db, dbId) => {
        const outsideCertifications = await db.collection('Provider').findOne(
            { "dbId" : dbId }, 
            { 
                "projection": 
                { "outside_certifications" : 1 } 
            });
        return outsideCertifications;
    };

    const addOutsideCertificationProvider = async (db, dbId, certification) => {
        const counter = await db.collection('Provider').findOne(
            { "dbId" : dbId },
            { 
                "projection": 
                { 
                    "count" : { "$size" : "$outside_certifications" }  // the $ operator in `$outside_certifications` is used to refer to the field `outside_certifications` 
                                        // in the db, otherwise mongo would think that we are trying to get the size of a string
                } 
            }
        );  // This is for the id of the new outside certification

        const result = await db.collection('Provider').updateOne(
                { "dbId" : dbId }, 
                { "$push": 
                    { 
                        "outside_certifications" : 
                        { 
                            "certification_id" : (counter + 1), 
                            "certification_name" : certification.name,
                            "certification_issuer" : certification.issuer,
                            "certification_description" : certification.description
                            // TODO: add things like expiration date, etc.
                        } 
                    } 
                }
        );

        if (result.result.ok !== 1)
            throw new OperationUnsuccessfulException();
        
        if (result.matchedCount === 0)
            throw new ProviderNotFoundException();

        if (result.modifiedCount === 0)
            throw new OperationUnsuccessfulException("Provider was found, but operation couldn't be completed");  
                                                    // Cannot be in the safe if as before, because we need to see whether the error happend
                                                    // Due to the provider not existing or due to the operation being unsuccessful
    };


    // TODO: add a method to update the outside certifications
    // TODO: add a method to delete the outside certifications
};

module.exports = getCertificationsMethods;