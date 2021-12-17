const {User} = require('../models');
const {userRole} = require('../constants/');
const {DEFAULT_USER_PASSWORD, DEFAULT_USER_EMAIL} = require('../config/config');

module.exports = async () => {
    const admin = await User.findOne({role: userRole.ADMIN}).lean();

    if (!admin) {
        await User.createUserWithHashPassword({
            name: 'Admin',
            username: 'DefaultUser',
            email: DEFAULT_USER_EMAIL,
            password: DEFAULT_USER_PASSWORD,
            role: userRole.ADMIN,
            city: 'Lviv'
        });
    }
};
