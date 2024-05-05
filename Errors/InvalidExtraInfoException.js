class InvalidExtraInfoException extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidExtraInfoException";
        this.statusCode = 400; // Bad Request
    }
};

module.exports = InvalidExtraInfoException;