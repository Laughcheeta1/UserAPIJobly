const jwt = require('jsonwebtoken');
const InvalidAccessTokenException = require('../Errors/InvalidAccessTokenException');
const NonExistingAccessTokenException = require('../Errors/NonExistingAccessTokenException');
const NoIdentificationException = require('../Errors/NoIdentificationException');
require('dotenv').config();

const verifyAccessToken = (req, res, next) => {
    const token = req.cookies['A_Token']; // Get the access token from the cookies

    // Check if the token exists
    if (!token) 
        throw new NonExistingAccessTokenException();

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) 
                throw new InvalidAccessTokenException(); //invalid token

            if (!decoded.dbId)
                throw new NoIdentificationException();

            req.body.dbId = decoded.dbId;
            req.body.email = decoded.email;
            req.body.role = decoded.role;
            next();
        }
    );
}

module.exports = verifyAccessToken;