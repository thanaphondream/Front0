const express = require('express')
const authenticate = require('../middlewares/authenticate')
const order = require('../constrollers/order-constroller')
const router = express.Router()

router.post('/order',order.createOrder)
router.post('/create', order.orders)
router.get('/orderallpay', authenticate, order.ordershowallpay)

module.exports = router