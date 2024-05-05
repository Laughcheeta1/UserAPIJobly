class InvalidReviewException extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidReviewException';
        this.statusCode = 400;  // Bad Request
    }
};

module.exports = InvalidReviewException;