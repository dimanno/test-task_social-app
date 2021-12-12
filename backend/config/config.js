module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    PORT: process.env.PORT || 5000,
    MONGO_CONNECT_URI: process.env.MONGO_CONNECT_URI || 'mongodb://localhost:27017/social_app',

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
}
