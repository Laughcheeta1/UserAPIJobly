class NonExistingAccessTokenException extends Error {
    constructor() {
        super(`You have not provided an access token.`);
        this.name = 'NonExistingAccessTokenException';
        this.statusCode = 401; // Unauthorized
    }
}

module.exports = NonExistingAccessTokenException;