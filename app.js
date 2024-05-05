const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Middlewares
const verifyAccessToken = require('./JWT/VerifyAccessToken');
const exceptionHandler = require('./Middlewares/ExceptionHandler');

const userController = require('./ControllerLayer/UserController');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(verifyAccessToken);
app.use('/API/User', userController);
app.use(exceptionHandler);  

module.exports = app;