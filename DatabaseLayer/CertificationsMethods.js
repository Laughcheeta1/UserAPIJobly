const OperationUnsuccessfulException = require('../Errors/OperationUnsuccessfulException');
const ProviderNotFoundException = require('../Errors/ProviderNotFoundException');

const getCertificationsMethods = (db) => {
    const getOutsideCertificationsProvider = async (dbId) => {
        const outsideCertifications = await db.collection('Provider').findOne(
            { "dbId" : dbId }, 
            { 
                "projection": 
                { "outside_certifications" : 1 } 
            }); // TODO: Make this not to return the id of the certifications, but only the name, issuer, etc.
        return outsideCertifications;
    };

    const addOutsideCertificationProvider = async (dbId, certification) => {
        let counter;
        try {    
            counter = (await db.collection('Provider').findOne(
                { "dbId" : dbId },
                { 
                    "projection": 
                    { 
                        "count" : { "$size" : "$outside_certifications" }  // the $ operator in `$outside_certifications` is used to refer to the field `outside_certifications` 
                                            // in the db, otherwise mongo would think that we are trying to get the size of a string
                    } 
                }
            )).count;  // This is for the id of the new outside certification
        }
        catch (error) // In case there is no outside certification yet
        {
            counter = 0;
        }
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

        if (result.matchedCount === 0)
            throw new ProviderNotFoundException();

        if (result.modifiedCount === 0)
            throw new OperationUnsuccessfulException("Provider was found, but operation couldn't be completed");  
                                                    // Cannot be in the safe if as before, because we need to see whether the error happend
                                                    // Due to the provider not existing or due to the operation being unsuccessful
    };


    // TODO: add a method to update the outside certifications
    // TODO: add a method to delete the outside certifications
    return {    
        getOutsideCertificationsProvider,
        addOutsideCertificationProvider
    };
};

module.exports = getCertificationsMethods;