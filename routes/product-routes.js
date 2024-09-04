const express = require('express')
const authenticate = require('../middlewares/authenticate')
const addminconstroller = require("../constrollers/addmin-constroller")
const upload = require('../middlewares/upload')
const router = express.Router()

router.post("/addproduct",upload.array("image",1),authenticate,addminconstroller.addproduct);
router.get('/getproduct',authenticate,addminconstroller.getproduct);
router.delete("/del/:id",authenticate,addminconstroller.deleteproduct);
router.patch("/up/:id",authenticate,addminconstroller.updateproduct);

router.get('/productId/:id', authenticate,addminconstroller.productshowId)

router.put('/productedit/:id',upload.array("image",1), addminconstroller.productedit)

router.put('/productstore/:id', addminconstroller.productstoreedit)

// router.get('/hello',(req, res) => {
//     res.json({msg: 'hello'})
// })
module.exports = router