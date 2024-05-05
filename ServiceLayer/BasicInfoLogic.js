const getBasicInfoLogic = (repository) => {
    const getBasicInfoEmployer = async (dbId) => {
        return await repository.getBasicInfoEmployer(dbId);
    };

    const getBasicInfoProvider = async (dbId) => {
        return await repository.getBasicInfoProvider(dbId);
    };

    return {
        getBasicInfoEmployer,
        getBasicInfoProvider
    };
};

module.exports = getBasicInfoLogic;