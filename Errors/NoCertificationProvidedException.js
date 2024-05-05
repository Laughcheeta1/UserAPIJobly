class NoCertificationProvidedException extends Error {
    constructor() {
        super("No certification provided");
        this.name = 'NoCertificationProvidedException';
        this.statusCode = 400; // Bad Request
    }
};

module.exports = NoCertificationProvidedException;