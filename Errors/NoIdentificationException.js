class NoIdentificationException extends Error {
    constructor() {
        super('No identification was provided');
        this.name = 'NoIdentificationException';
        this.statusCode = 400; // Bad Request
    }
}

module.exports = NoIdentificationException;