const InvalidExtraInfoException = require("../Errors/InvalidExtraInfoException");

const getExtraInfoLogic = (repository) => {
    const getExtraInfoProvider = async (dbId) => {
        return await repository.getExtraInfoProvider(dbId);
    };

    const addExtraInfoProvider = async (dbId, extraInfo) => {
        console.log(extraInfo)
        if (!extraInfo.name)
            throw new InvalidExtraInfoException("No name for the extra info was provided");

        if (!extraInfo.description)
            extraInfo.description = "";

        return await repository.addExtraInfoProvider(dbId, extraInfo);
    }

    const updateExtraInfoProvider = async (dbId, infoToUpdate) => {
        await repository.updateExtraInfoProvider(dbId, infoToUpdate);
    };

    const deleteExtraInfoProvider = async (dbId, info_id) => {
        await repository.deleteExtraInfoProvider(dbId, info_id);
    };

    return {
        getExtraInfoProvider,
        addExtraInfoProvider,
        updateExtraInfoProvider,
        deleteExtraInfoProvider
    };
};

module.exports = getExtraInfoLogic;