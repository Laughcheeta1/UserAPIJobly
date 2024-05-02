class InvalidAccessTokenException extends Error {
    constructor() {
        super(`The access token provided is invalid. It has either been tampered with or has expired.`);
        this.name = 'InvalidAccessTokenException';
        this.statusCode = 401; // Unaothorized
    }
}

module.exports = InvalidAccessTokenException;