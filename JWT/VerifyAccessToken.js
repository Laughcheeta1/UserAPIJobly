const jwt = require('jsonwebtoken');
const InvalidAccessTokenException = require('../Errors/InvalidAccessTokenException');
const NonExistingAccessTokenException = require('../Errors/NonExistingAccessTokenException');

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

            req.dbId = decoded.dbId;
            req.email = decoded.email;
            req.role = decoded.role;
            next();
        }
    );
}

module.exports = verifyAccessToken;