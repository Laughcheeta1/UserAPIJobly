class InvalidTokenException extends Error {
    constructor() {
        super(`The token provided is invalid. It has either been tampered with or has expired.`);
        this.name = 'InvalidTokenException';
        this.statusCode = 401; // Unaothorized
    }
}

module.exports = InvalidTokenException;