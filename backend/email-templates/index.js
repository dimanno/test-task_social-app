const {emailAction} = require('../constants');

module.exports = {
    [emailAction.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome!'
    },
    [emailAction.UPDATE_ACCOUNT]: {
        templateName: 'update',
        subject: 'Update account data!'
    },

    [emailAction.CREATE_POST]: {
        templateName: 'addPost',
        subject: 'your new post!'
    },

    [emailAction.FORGOT_PASSWORD]: {
        templateName: 'forgot.password',
        subject: 'Every body forgot something. Dont worry'
    },

    [emailAction.SET_NEW_PASSWORD]: {
        templateName: 'change.password',
        subject: 'Your password has been changed'
    },
}
