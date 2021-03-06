module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    PORT: process.env.PORT || 5050,
    MONGO_CONNECT_URI: process.env.MONGO_CONNECT_URI || 'mongodb://localhost:27017/social_app',

    DEFAULT_USER_PASSWORD: process.env.DEFAULT_USER_PASSWORD,
    DEFAULT_USER_EMAIL: process.env.DEFAULT_USER_EMAIL,

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'xxx',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'yyy',
    JWT_ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET || 'zzz',

    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL: process.env.EMAIL

};
