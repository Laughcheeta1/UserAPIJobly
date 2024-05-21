const getBasicInfoLogic = (repository) => {
    const getBasicInfoEmployer = async (dbId) => {
        return await repository.getBasicInfoEmployer(dbId);
    };


    const updateBasicInfoEmployer = async (dbId, infoToUpdate) => {
        await repository.updateBasicInfoEmployer(dbId, infoToUpdate);
    };


    const getBasicInfoProvider = async (dbId) => {
        return await repository.getBasicInfoProvider(dbId);
    };

    const updateBasicInfoProvider = async (dbId, infoToUpdate) => {
        await repository.updateBasicInfoProvider(dbId, infoToUpdate);
    };



    return {
        getBasicInfoEmployer,
        updateBasicInfoEmployer,
        getBasicInfoProvider,
        updateBasicInfoProvider
    };
};

module.exports = getBasicInfoLogic;