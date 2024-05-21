const ProviderNotFoundException = require('../Errors/ProviderNotFoundException');
const EmployerNotFoundException = require('../Errors/EmployerNotFoundException');
const OperationUnsuccessfulException = require('../Errors/OperationUnsuccessfulException');

const getReviewsMethods = (db) => {
    const getReviewsProvider = async (dbId) => {
        return await db.collection('Provider').findOne(
            { "dbId" : dbId }, 
            { 
                "projection": 
                { "reviews" : 1 } 
            });  // TODO: Make this not to return the id of the reviews, but only the author, date, etc.
    };

    const addReviewProvider = async (dbId, review) => {
        let counter;

        try {
        counter = (await db.collection('Provider').findOne(
            { "dbId" : dbId },
            { 
                "projection": 
                { 
                    "count" : { "$size" : "$reviews" }  // the $ operator in `$reviews` is used to refer to the field `reviews` 
                                        // in the db, otherwise mongo would think that we are trying to get the size of a string
                } 
            }
        )).count;  // This is for the id of the new review
    }
    catch (error)  // In case there is no reviews yet
    {
        counter = 0;    
    }
     
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

    
    // EMPLOYER

    const getReviewsEmployer = async (dbId) => {
        return await db.collection('Employer').findOne(
            { "dbId" : dbId }, 
            { 
                "projection": 
                { "reviews" : 1 } 
            });  // TODO: Make this not to return the id of the reviews, but only the author, date, etc.
    };

    const addReviewEmployer = async (dbId, review) => {
       let counter;

        try {
            counter = (await db.collection('Employer').findOne(
                { "dbId" : dbId },
                { 
                    "projection": 
                    { 
                        "count" : { "$size" : "$reviews" }  // the $ operator in `$reviews` is used to refer to the field `reviews` 
                                            // in the db, otherwise mongo would think that we are trying to get the size of a string
                    } 
                }
            )).count;  // This is for the id of the new review
        }
        catch (error)  // In case there is no reviews yet
        {
            counter = 0;
        }

        const result = await db.collection('Employer').updateOne(
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
            throw new EmployerNotFoundException();

        if (result.modifiedCount === 0)
            throw new OperationUnsuccessfulException("Employer was found, but operation couldn't be completed");  
                                                    // Cannot be in the safe if as before, because we need to see whether the error happend
                                                    // Due to the provider not existing or due to the operation being unsuccessful
    };

    return {    
        getReviewsProvider,
        addReviewProvider,
        getReviewsEmployer,
        addReviewEmployer
    };
};

module.exports = getReviewsMethods;