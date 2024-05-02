class NonExistingTokenException extends Error {
    constructor() {
        super(`You have not provided a token.`);
        this.name = 'NonExistingTokenException';
        this.statusCode = 401; // Unauthorized
    }
}

module.exports = NonExistingTokenException;