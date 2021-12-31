const express = require('express');
const router = express.Router();
const productController = require('./../../controllers/admin/product')

router.post('', productController.addProducts);

module.exports = router;