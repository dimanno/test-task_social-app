const nodemailer = require('nodemailer');
const path =require('path');
const EmailTemplates = require('email-templates');

const {EMAIL, EMAIL_PASSWORD} = require('../config/config');
const allTemplates = require('../email-templates');
const {messageResponse, statusCodeResponse} = require("../constants");
const ErrorHandler = require("../errors/errorHandler");

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
});

const sendEmail = async (userEmail, emailAction, context = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler(messageResponse.INVALID_TEMPLATE, statusCodeResponse.BAD_REQUEST);
    }

    const html = await templateParser.render(templateInfo.templateName, context);

    return transporter.sendMail({
        from: 'NO REPLY',
        to: userEmail,
        subject: templateInfo.subject,
        html
    })
};

module.exports = {sendEmail};
