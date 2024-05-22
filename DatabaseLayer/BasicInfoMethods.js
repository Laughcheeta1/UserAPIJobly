const getBasicInfoMethods = (db) => {
    const getBasicInfoProvider = async (dbId) => {
        const basicInfo = await db.collection('Provider').findOne({ dbId : dbId }, { projection: { name : 1, phone : 1, email : 1 } });
        return basicInfo;
    };


    const updateBasicInfoProvider = async (dbId, infoToUpdate) => {
        await db.collection('Provider').updateOne(
            { dbId : dbId },
            { $set: 
                {
                    ...infoToUpdate
                }
            }
        );
    };


    const getBasicInfoEmployer = async (dbId) => {
        const basicInfo = await db.collection('Employer').findOne({ dbId : dbId }, { projection: { name : 1, phone_number : 1, email : 1 } });
        return basicInfo;
    };


    const updateBasicInfoEmployer = async (dbId, infoToUpdate) => {
        await db.collection('Employer').updateOne(
            { dbId : dbId },
            { $set: 
                {
                    ...infoToUpdate
                }
            }
        );
    };

    // The Basic info cannot be deleted, nor new basic info can be created

    // TODO: define whether or not to be able to update the basic info

    return {
        getBasicInfoProvider,
        updateBasicInfoProvider,
        getBasicInfoEmployer,
        updateBasicInfoEmployer
    };
};

module.exports = getBasicInfoMethods;