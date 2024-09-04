require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Routers = require('./routes/auth')
const notFound = require("./middlewares/notFound")
const errorMiddleware = require("./middlewares/error")
const Listproduct = require("./routes/product-routes")
const Cartproduct = require("./routes/cart-routes")
const payment = require("./routes/payment-routes")
const orders = require("./routes/order-routes")
const location = require("./routes/location-routse")
// const authenticate = require("./middlewares/authenticate")



const app = express()



app.use(cors())
app.use(express.json())

//Route
app.use('/auth/',Routers)
app.use('/product/',Listproduct)
app.use('/cart/',Cartproduct)
app.use('/payment/', payment)
app.use('/orders/', orders)
app.use('/locations/', location)

// app.use('/user/',authenticate ,(req,res,next) =>{
//     // res.json({msg: 'Private area'})
//     res.json({user: req.user})
// })


  


// notFound
app.use( notFound )

// error
app.use(errorMiddleware)



let port = process.env.PORT || 8000
app.listen(port, ()=> console.log('Server on Port :', port))