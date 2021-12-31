const database = require('../db');
const userRef = database.ref('user')
const jwt = require('../util/jwt');
const bcrypt = require('../util/bcrypt')
const config = require('../config/config');
const { startLog, endLog } = require('../util/log');
const { StatusCodes } = require('http-status-codes');
const { constants } = require('../config/messages');

const moduleName = 'Auth'

const signup = async (req, res, next) => {
    try {
        startLog(moduleName, 'signup');
        let body = JSON.parse(JSON.stringify(req.body))
        console.log('before', body)

        userRef.orderByChild('email').equalTo(body.email).once('value', snap => {
            console.log(snap.val())
            if (snap.exists()) {
                return res.status(StatusCodes.CONFLICT).json({ status: StatusCodes.CONFLICT, message: constants.DUPLICATE_EMAIL, data: {} });
            } else {
                body._id = userRef.push().key;
                body.isActive = true;
                body.password = bcrypt.createBcrypt(body.password);
                body.authToken = jwt.generateToken({ _id: body._id, email: body.email, userRole: body.userRole, createdAt: Date.now() }, config.jwt['authTokenSecret'], config.jwt['authTokenExpiresIn']);
                userRef.child(body._id).set(body, snap => {
                    endLog(module, 'signup')
                    return res.status(StatusCodes.OK).json({ status: StatusCodes.OK, message: constants.CREATED })
                });
            }
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
};

const login = (req, res, next) => {
    try {
        startLog(moduleName, 'login');
        const body = req.body;
        userRef.orderByChild('email').equalTo(body.email).once('value', (snap) => {
            if (!snap.exists())
                return res.status(StatusCodes.BAD_REQUEST).json({ status: StatusCodes.BAD_REQUEST, message: constants.INVALID_CREDS, data: {} });

            snap.forEach((user) => {
                const userData = user.val();
                if (!userData.isActive)
                    return res.status(StatusCodes.UNAUTHORIZED).json({ status: StatusCodes.UNAUTHORIZED, message: constants.ACCESS_REVOKED, data: {} });
                const _id = userData._id;
                const userRole = userData.userRole;
                const isCorrect = bcrypt.compareBcrypt(body.password, userData.password)
                if (!isCorrect)
                    return res.status(StatusCodes.BAD_REQUEST).json({ status: StatusCodes.BAD_REQUEST, message: constants.INVALID_CREDS, data: {} });
                if (body.userRole != userData.userRole)
                    return res.status(StatusCodes.UNAUTHORIZED).json({ status: StatusCodes.UNAUTHORIZED, message: constants.ACCESS_REVOKED, data: {} });

                const authToken = jwt.generateToken({ _id: _id, email: body.email, userRole: userRole, createdAt: Date.now() }, config.jwt['authTokenSecret'], config.jwt['authTokenExpiresIn']);
                console.log('Token generated:', authToken);
                user.ref.child('authToken').set(authToken);
                let paylod = user.val();
                delete paylod.password;
                delete paylod.authToken;
                endLog(moduleName, 'login');
                return res.status(StatusCodes.OK).json({ status: StatusCodes.OK, message: constants.LOGIN_SUCCESS, paylod})

            });
        });
    } catch (error) {
        console.log('Error:', error);
        return sendResponse(req, res, false, 400, 'BAD_REQUEST');
    }
};

module.exports = {
    signup,
    login
}