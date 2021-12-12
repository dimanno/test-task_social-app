const ErrorHandler = require('../errors/errors.handler');
const {statusCodeResponse} = require('../constants');

module.exports = {
    checkValidDataMiddleware: (validator) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, statusCodeResponse.BAD_REQUEST);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
};
