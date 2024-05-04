const ProviderNotFoundException = require('../Errors/ProviderNotFoundException');
const OperationUnsuccessfulException = require('../Errors/OperationUnsuccessfulException');

const getReviewsMethods = (db) => {
    const getReviewsProvider = async (db, dbId) => {
        return await db.collection('Provider').findOne(
            { "dbId" : dbId }, 
            { 
                "projection": 
                { "reviews" : 1 } 
            });;
    };

    const addReviewProvider = async (db, dbId, review) => {
        const counter = await db.collection('Provider').findOne(
            { "dbId" : dbId },
            { 
                "projection": 
                { 
                    "count" : { "$size" : "$reviews" }  // the $ operator in `$reviews` is used to refer to the field `reviews` 
                                        // in the db, otherwise mongo would think that we are trying to get the size of a string
                } 
            }
        );  // This is for the id of the new review

        const result = await db.collection('Provider').updateOne(
                { "dbId" : dbId }, 
                { "$push": 
                    { 
                        "reviews" : 
                        { 
                            "review_id" : (counter + 1),
                            "review_author" : review.author, 
                            "review_date" : review.date,
                            "review_rating" : review.rating,
                            "review_description" : review.description
                        }
                    }
                }
        );

        if (result.result.ok !== 1)
            throw new OperationUnsuccessfulException();

        if (result.matchedCount === 0)
            throw new ProviderNotFoundException();

        if (result.modifiedCount === 0)
            throw new OperationUnsuccessfulException("Provider was found, but operation couldn't be completed");  
                                                    // Cannot be in the safe if as before, because we need to see whether the error happend
                                                    // Due to the provider not existing or due to the operation being unsuccessful
    };

    return {    
        getReviewsProvider,
        addReviewProvider
    };
};

module.exports = getReviewsMethods;