const admin = require('firebase-admin');
const config = require('./config/config');

let serviceAccount = require("./serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firebaseConfig.databaseURL
});
const database = admin.database();

module.exports = database;