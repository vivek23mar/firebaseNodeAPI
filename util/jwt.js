const jwt = require("jsonwebtoken");

const generateToken = function (data, secret, expiresIn) {
    try {
        const token = jwt.sign({ authUser: data }, secret, { expiresIn: expiresIn }).toString();
        return token;
    } catch (error) {
        console.log('Error:', error);
        return;
    }
}

const validateToken = (token, secret) => {
    try {
        const decodedJwt = jwt.verify(token, secret);
        return decodedJwt;
    } catch (error) {
        console.log('Error:', error);
        return false;
    }
}

const decodeToken = (token, secret) => {
    try {
        const decodedToken = jwt.decode(token, secret);
        return decodedToken;
    } catch (error) {
        console.log('Error:', error);
        return error;
    }
}

module.exports = {
    generateToken,
    validateToken,
    decodeToken
}