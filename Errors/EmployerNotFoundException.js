class EmployerNotFoundException extends Error {
    constructor() {
        super('The employer with the specified id was not found.');
        this.name = "EmployerNotFoundException";
        this.statusCode = 404;  // not found
    }
}

module.exports = EmployerNotFoundException;