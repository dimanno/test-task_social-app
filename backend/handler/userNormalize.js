
const userNormalize = (userNorm = {}) => {
    const removeFields = ['password'];

    removeFields.forEach(field => {
        delete userNorm[field];
    })
    return userNorm;
}

module.exports = userNormalize;
