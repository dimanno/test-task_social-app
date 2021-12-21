const {emailAction} = require('../constants');

module.exports = {
    [emailAction.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome!'
    },
};
