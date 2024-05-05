const getServicesLogic = (repository) => {
    const getJoinedOfferingsProvider = async (dbId) => {
        return await repository.getJoinedOfferingsProvider(dbId);
    };

    const getMadeOfferingsEmployer = async (dbId) => {
        return await repository.getMadeOfferingsEmployer(dbId);
    }

    return {
        getJoinedOfferingsProvider,
        getMadeOfferingsEmployer
    };
};

module.exports = getServicesLogic;