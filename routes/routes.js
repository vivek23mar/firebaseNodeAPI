const express = require('express');
const router = express.Router();

const productRouter = require('./admin/product');
const authRouter = require('./onboard')

router.use('/admin/product',productRouter);
router.use('/auth',authRouter)

module.exports = router;