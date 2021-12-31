const bcrypt = require("bcrypt");
const config = require("../config/config");

const createBcrypt = (plain, hashrounds = config.HASH_ROUNDS) => {
  try {
    const salt = bcrypt.genSaltSync(parseInt(hashrounds));
    return bcrypt.hashSync(JSON.stringify(plain), salt);
  } catch (error) {
    console.log('Error:', error);
    return;
  }
};

const compareBcrypt = (plain, hashed) => bcrypt.compareSync(JSON.stringify(plain), hashed);

module.exports = {
  createBcrypt,
  compareBcrypt
};
