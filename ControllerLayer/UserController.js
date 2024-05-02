const { validateJwt } = require('../JWT/Jwt');

router = require('express').Router();
trycatch = require('../utils/tryCatch');
serviceInitializer = require('../ServiceLayer/RegisterService');

serviceInitializer().then((service) => {
    
});

module.exports = router;