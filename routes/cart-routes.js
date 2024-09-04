const express = require('express')
const authenticate = require('../middlewares/authenticate')
const cart = require('../constrollers/cart-constroller')

const router = express.Router()

router.post('/cart', cart.addcart)
router.post('/cartclone/', cart.cartsclone)


router.get('/user', authenticate, cart.userIds )
router.get('/showcarts', authenticate, cart.showcart)
router.get('/showidcart',  authenticate, cart.showcartid)

router.delete('/deletecart/:id',cart.deletecart)

router.put('/updatequantity/:id', authenticate, cart.updatecart)
router.put('/updatastart/:id', cart.upcartstatus)



module.exports = router