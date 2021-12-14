const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const {usersRouter, authRouter} = require('./routes');
const {PORT, MONGO_CONNECT_URI, ALLOWED_ORIGIN, NODE_ENV} = require('./config/config');
const ErrorHandler = require('./errors/errorHandler');
const addDefaultUser = require('./handler/default.user');

const app = express();
// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: _configCors}));
app.use(helmet());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));

if (NODE_ENV === 'dev') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

mongoose.connect(MONGO_CONNECT_URI).then(()=> {
    console.log('mongoDB connect successfully');
});
// routes
app.use('/auth', authRouter);
app.use('/users', usersRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
});

app.listen(PORT, ()=> {
    console.log(`app listen ${PORT}`);

    addDefaultUser().then();
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
