const express = require('express')
const constroller = require("../constrollers/auth-constroller")
const authenticate = require('../middlewares/authenticate')
const addmin = require('../constrollers/addmin-constroller')


const router = express.Router()



router.post('/register', constroller.register)
router.post('/login',constroller.login)
router.get('/me',authenticate,constroller.getme)
router.get('/amorder',authenticate,addmin.getorder)
router.get('/userById',authenticate,constroller.userid)



// router.get('/hello',(req, res) => {
//     res.json({msg: 'hello'})
// })
module.exports = router