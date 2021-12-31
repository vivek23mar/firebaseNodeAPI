const dotenv = require('dotenv');

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    DATABASE_URL,
    HASH_ROUNDS,
    JWT_AUTH_SECRET,
    JWT_AUTH_EXPIRE_TIME,
    JWT_FORGETPASS_SECRET,
    JWT_FORGETPASS_SECRET_EXPIRE_TIME
} = process.env;

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    HASH_ROUNDS,
    firebaseConfig: {
        databaseURL: DATABASE_URL,
    },
    jwt: {
        authTokenSecret: JWT_AUTH_SECRET,
        authTokenExpiresIn: JWT_AUTH_EXPIRE_TIME,
        forgetPassSecret: JWT_FORGETPASS_SECRET,
        forgetPassExpiresIn: JWT_FORGETPASS_SECRET_EXPIRE_TIME
    }
}