const express = require('express')
const authenticate = require('../middlewares/authenticate')
const location = require('../constrollers/location')
const router = express.Router()

router.post('/location',location.addlocation)
router.get('/getlocation',authenticate,location.getlocationsbyuser)

module.exports = router