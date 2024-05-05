const InvalidExtraInfoException = require("../Errors/InvalidExtraInfoException");

const getExtraInfoLogic = (repository) => {
    const getExtraInfoProvider = async (dbId) => {
        return await repository.getExtraInfoProvider(dbId);
    };

    const addExtraInfoProvider = async (dbId, extraInfo) => {
        if (!extraInfo.name)
            throw new InvalidExtraInfoException("No name for the extra info was provided");

        if (!extraInfo.description)
            extraInfo.description = "";

        return await repository.addExtraInfoProvider(dbId, extraInfo);
    }

    return {
        getExtraInfoProvider,
        addExtraInfoProvider
    };
};

module.exports = getExtraInfoLogic;