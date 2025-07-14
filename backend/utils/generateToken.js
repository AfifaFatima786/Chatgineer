// utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
};

module.exports = generateToken;
