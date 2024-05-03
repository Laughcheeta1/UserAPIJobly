class ProviderNotFoundException extends Error {
    constructor() {
        super(`The provider with the specified id was not found.`);
        this.name = 'ProviderNotFoundException';
        this.statusCode = 404;  // not found
    }
}

module.exports = ProviderNotFoundException;