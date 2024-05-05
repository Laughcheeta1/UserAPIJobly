class NoExtraInfoProvidedException extends Error {
    constructor() {
        super("No extra info was provided.");
        this.name = 'NoExtraInfoProvidedException';
        this.statusCode = 400; // Bad Request
    }
};

module.exports = NoExtraInfoProvidedException;