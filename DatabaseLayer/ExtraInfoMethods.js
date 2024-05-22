const ProviderNotFoundException = require('../Errors/ProviderNotFoundException');
const OperationUnsuccessfulException = require('../Errors/OperationUnsuccessfulException');

const getExtraInfoMethods = (db) => {
    const getExtraInfoProvider = async (dbId) => {
        // TODO: change this in a way that it first returns only 5, then the rest, etc.
        const extraInfo = await db.collection('Provider').findOne(
            { "dbId" : dbId }, 
            { 
                "projection": 
                { "extra_info" : 1 }    
            });  // TODO: Make this not to return the id of the extra info, but only the name and description
        return extraInfo;
    };

    const addExtraInfoProvider = async (dbId, extraInfo) => {
        let counter;
        try {
            counter = (await db.collection('Provider').findOne(
                { "dbId" : dbId },
                { 
                    "projection": 
                    { 
                        "count" : { "$size" : "$extra_info" }  // the $ operator in `$extra_info` is used to refer to the field `extra_info` 
                                            // in the db, otherwise mongo would think that we are trying to get the size of a string
                    } 
                }
            )).count;  // This is for the id of the new extra info
        }
        catch (error) // In case there is no extra info yet
        {
            counter = 0;
        }
            
        const result = await db.collection('Provider').updateOne(
                { "dbId" : dbId }, 
                { "$push": 
                { 
                    "extra_info" : 
                    { 
                        "info_id" : (counter + 1), 
                        "info_name" : extraInfo.name,
                        "info_description" : extraInfo.description
                    } 
                } 
            });
    
        if (result.matchedCount === 0) 
            throw new ProviderNotFoundException();

        if (result.modifiedCount === 0)
            throw new OperationUnsuccessfulException("Provider was found, but operation couldn't be completed");  
                                                    // Cannot be in the safe if as before, because we need to see whether the error happend
                                                    // Due to the provider not existing or due to the operation being unsuccessful
        // If no error then all good
    };

    // TODO: add a method to update the extra info
    const updateExtraInfoProvider = async (dbId, infoToUpdate) => {
        console.log(dbId)
        console.log(infoToUpdate)
        await db.collection('Provider').updateOne(
            { dbId : dbId },
            { $set: 
                {
                    extra_info: infoToUpdate
                }
            }
        );
    };

    // TODO: add a method to delete the extra info
    
    return {    
        getExtraInfoProvider,
        addExtraInfoProvider,
        updateExtraInfoProvider
    };
};

module.exports = getExtraInfoMethods;