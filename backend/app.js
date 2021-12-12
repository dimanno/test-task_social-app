const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const {usersRouter, authRouter} = require('./routes')
const {PORT, MONGO_CONNECT_URI, ALLOWED_ORIGIN, NODE_ENV} = require('./config/config');
const ErrorHandler = require('./errors/errorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(MONGO_CONNECT_URI).then(()=> {
    console.log('mongoDB connect successfully');
});
app.use(cors({origin, _configCors}));

app.use('/users', authRouter);
app.use('/users', usersRouter);

app.listen(PORT, ()=> {
    console.log(`app listen ${PORT}`);
});

function _configCors(origin, callback) {

    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler('CORS is not allowed'), false);
    }

    return callback(null, true);
}
