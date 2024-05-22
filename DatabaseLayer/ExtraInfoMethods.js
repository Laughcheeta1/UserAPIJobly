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

    const getMaxInfoId = async (dbId) => {
        const { extra_info } = await getExtraInfoProvider(dbId)
        if (extra_info.length === 0) return 0;
    
        return extra_info.reduce((max, current) => {
            return current.info_id > max ? current.info_id : max;
        }, extra_info[0].info_id);
    };

    const addExtraInfoProvider = async (dbId, extraInfo) => {
        const maxId = await getMaxInfoId(dbId)
        
        const result = await db.collection('Provider').updateOne(
                { "dbId" : dbId }, 
                { "$push": 
                { 
                    "extra_info" : 
                    { 
                        "info_id" : (maxId + 1), 
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

    const updateExtraInfoProvider = async (dbId, infoToUpdate) => {
        await db.collection('Provider').updateOne(
            { dbId : dbId },
            { $set: 
                {
                    extra_info: infoToUpdate
                }
            }
        );
    };

    const deleteExtraInfoProvider = async (dbId, info_id) => {
        try {
            await db.collection('Provider').updateOne(
                { dbId: dbId },
                { $pull: { extra_info: { info_id: info_id } } }
            );
            console.log(`Extra info with id ${info_id} deleted successfully`);
        } catch (error) {
            console.error(`Error deleting extra info: ${error}`);
        }
    };
    
    return {    
        getExtraInfoProvider,
        addExtraInfoProvider,
        updateExtraInfoProvider,
        deleteExtraInfoProvider
    };
};

module.exports = getExtraInfoMethods;