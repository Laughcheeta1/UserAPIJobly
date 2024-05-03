const getBasicInfoMethods = (db) => {
    const getBasicInfoProvider = async (db, dbId) => {
        const basicInfo = await db.collection('Provider').findOne({ dbId : dbId }, { projection: { name : 1, phone_number : 1, email : 1 } });
        return basicInfo;
    };

    const getBasicInfoEmployer = async (db, dbId) => {
        const basicInfo = await db.collection('Employer').findOne({ dbId : dbId }, { projection: { name : 1, phone_number : 1, email : 1 } });
        return basicInfo;
    };

    // The Basic info cannot be deleted, nor new basic info can be created

    // TODO: define whether or not to be able to update the basic info

    return {
        getBasicInfoProvider,
        getBasicInfoEmployer
    };
};

module.exports = getBasicInfoMethods;