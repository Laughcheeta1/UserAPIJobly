class NoReviewProvidedException extends Error {
    constructor() {
        super('No review provided');
        this.name = 'NoReviewProvidedException';
        this.statusCode = 400; // Bad Request
    }
};

module.exports = NoReviewProvidedException;