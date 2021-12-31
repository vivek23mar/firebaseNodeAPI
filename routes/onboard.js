const express = require('express');
const router = express.Router();
const onboardController = require('../controllers/onboard')

router.post('/register', onboardController.signup);
router.patch('/login', onboardController.login);


module.exports = router