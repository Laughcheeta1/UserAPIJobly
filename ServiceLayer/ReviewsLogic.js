const InvalidReviewException = require("../Errors/InvalidReviewException");

const getReviewsLogic = (repository) => {
    const getReviewsProvider = async (dbId) => {
        return await repository.getReviewsProvider(dbId);
    };

    const addReviewProvider = async (dbId, review) => {
        if (!review.author)
            throw new InvalidReviewException("No author for the review was provided");

        if (!review.date)
            throw new InvalidReviewException("No date for the review was provided");

        if (!review.rating)
            throw new InvalidReviewException("No rating for the review was provided");

        if (!review.description)
            throw new InvalidReviewException("No description for the review was provided");

        return await repository.addReviewProvider(dbId, review);
    };


    // EMPLOYER

    const getReviewsEmployer = async (dbId) => {
        return await repository.getReviewsEmployer(dbId);
    };

    const addReviewEmployer = async (dbId, review) => {
        if (!review.author)
            throw new InvalidReviewException("No author for the review was provided");

        if (!review.date)
            throw new InvalidReviewException("No date for the review was provided");

        if (!review.rating)
            throw new InvalidReviewException("No rating for the review was provided");

        if (!review.description)
            throw new InvalidReviewException("No description for the review was provided");

        return await repository.addReviewEmployer(dbId, review);
    };

    return {
        getReviewsProvider,
        addReviewProvider,
        getReviewsEmployer,
        addReviewEmployer
    };
};

module.exports = getReviewsLogic;