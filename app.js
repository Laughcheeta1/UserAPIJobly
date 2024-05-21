const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require("cookie-parser");

// Middlewares
const verifyAccessToken = require('./JWT/VerifyAccessToken');
const exceptionHandler = require('./Middlewares/ExceptionHandler');

const userController = require('./ControllerLayer/UserController');

const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173',  // Replace with your client's origin
    credentials: true
}));

app.use(express.json());
app.use(verifyAccessToken);
app.use('/API/User', userController);
app.use(exceptionHandler);  

module.exports = app;