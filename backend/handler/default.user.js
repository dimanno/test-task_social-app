const {User} = require('../models');
const {userRole} = require('../constants/');
const {DEFAULT_USER_PASSWORD} = require('../config/config');

module.exports = async () => {
    const admin = await User.findOne({role: userRole.ADMIN}).lean();
    if (!admin) {
        await User.createUserWithHashPassword({
            name: 'Dmytro',
            username: 'Dima',
            email: 'dimannov@gmail.com',
            password: '12345Az$',
            role: userRole.ADMIN,
            city: 'Lviv'
        })
    }
};
