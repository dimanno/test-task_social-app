const {Schema, model} = require('mongoose');

const {models_name, userRole} = require('../constants');
const {passwordService} = require('../services');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    city: {
        type: String,
    },
    avatarPicture: {
        type: String,
        default: '',
    },
    coverPicture: {
        type: String,
        default: '',
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    role: {
        type: String,
        default: userRole.USER,
        enum: Object.values(userRole)
    },
    isActive: {
        type: Boolean,
        default: false,
        required: true
    }

}, {timestamps:true});

module.exports = userSchema.statics = {
    async createUserWithHashPassword(userObject) {
        const hashedPassword = await passwordService.hash(userObject.password);

        return this.create({
            ...userObject,
            password: hashedPassword
        });
    },

    updateData(user_Id, userDataObject) {
        return this.findByIdAndUpdate(
            user_Id,
            userDataObject,
            {new: true, runValidators: true}
        ).lean();
    },
};

module.exports = model(models_name.USER, userSchema);
