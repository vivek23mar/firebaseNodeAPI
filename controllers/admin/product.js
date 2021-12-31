const database = require('./../../db');
const { startLog, endLog } = require('./../../util/log');
const { constants } = require('../../config/messages');
const { StatusCodes } = require('http-status-codes')
const moduleName = 'Product'

const addProducts = async (req, res, next) => {
    try {
        startLog(moduleName, 'Add')
        await database.collection('products').doc().set(req.body)
        endLog(moduleName, 'Add Product')
        res.status(StatusCodes.OK).json({ status: StatusCodes.OK, message: constants.CREATED, data: {} })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
}

module.exports = {
    addProducts
}