class InvalidCertificationException extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidCertificationException';
        this.statusCode = 400; // Bad Request
    }
};

module.exports = InvalidCertificationException;