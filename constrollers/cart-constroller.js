// const { NOTFOUND } = require("dns");
const db = require("../models/db");

exports.addcart = async (req, res, next) => {
  try {
    const { userId, productId, total, all_price, status } = req.body;
    console.log(userId, productId, total, all_price)
    const cart = await db.cart.create({
      data: {
        total: Number(total),
        all_price: Number(all_price),
        user: {
          connect: { id: userId }
        },
        product: {
          connect: { id: productId }
        },
        status,
      }
    })

    res.json({ message: "Cart item added successfully", cart });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.userIds = async (req, res, next) => {
  try {
    console.log(req.user.id)
    const user = await db.users.findFirst({
      where:{
        id: req.user.id
      }
    })
    res.json(user)
  }catch(error){
    next(error)
  }
}

exports.showcart = async (req, res, next) => {
  try{
    const carts = await db.cart.findMany({
      where: {
        userId: req.user.id
      }, include: {
        product: true
      }
    })
    res.json(carts)
  }catch(err){
    next(err)
  }
}

exports.showcartid = async (req, res, next) => {
  try {
    const carts = await db.cart.findMany({
      where: {
        userId: req.user.id,
        // status: 'ยังไม่ชำระ' 
      },
      select: {
        id: true,  
        product: true,
        total: true,
        all_price: true,
      }
    });

    // // Combine items with the same productId
    // const combinedCarts = [];
    // carts.forEach(cart => {
    //   const existingCart = combinedCarts.find(item => item.productId === cart.productId);
    //   if (existingCart) {
    //     existingCart.total += cart.total;
    //     existingCart.all_price += cart.all_price;
    //   } else {
    //     combinedCarts.push({ ...cart });
    //   }
    // });

    // res.json(combinedCarts);
    res.json(carts)
  } catch (err) {
    next(err);
  }
};



// exports.ClearCart = async (req, res, next) => {
//   try {
//     const userId = req.user.id
//     console.log(userId)
//     await db.cart.deleteMany({
//       where: { userId: userId }
//     });
//     res.json({ message: "Cart cleared successfully" });
    
//   } catch (err) {
//     next(err)
    
//   }
// }

exports.deletecart = async (req, res, next) => {
  try{
    const { id } = req.params
    console.log(id)
    const carts = await db.cart.delete({
      where:{
        id: id
      }
    })
    res.json({mas: "cart is : ", carts})
  }catch(err){
    next(err)
  }
}


exports.updatecart = async (req, res, next) => {
  const { id } = req.params;
  const { total, all_price } = req.body;
  console.log("Updating Cart", id, total);

  try {
    const cartItem = await db.cart.findUnique({
      where: {
        id: id
      },
      include: {
        product: true
      }
    });


    const currentTotal = cartItem.total;
    const storeStock = cartItem.product.store;

    if (total > storeStock && total > currentTotal) {
      return res.status(400).json({ error: 'Not enough stock in store' });
    }

    const updatedCart = await db.cart.update({
      where: { id: id },
      data: { total: total, all_price: all_price }
    });

    console.log('Updated Cart:', updatedCart);
    res.json(updatedCart);

  } catch (error) {
    console.error('Error updating cart', error);
    res.status(500).json({ error: 'Unable to update cart total' });
  }
}


exports.upcartstatus = async (req, res, next) => {
  try{
    const { id } = req.params
    const { status } = req.body

    const cart = await db.cart.update({
      where: {
        id: id
      },data:{
        status,
      }
    })
    res.json({msg: 'UpdateStatusCart is : ', cart})
  }catch(err){
    next(err)
  }
}

exports.cartsclone = async (req, res, next) => {
  try{
    const { id } = req.body
    console.log(id)
    const cart = await db.cart.findUnique({
      where: {
        id : id
      }
    })
    console.log("dda",cart)

    // const { total, all_price, userId, status, productId } = req.params

    const cartclone = await db.cartclone.create({
      data: {
        total: cart.total,
        all_price: cart.all_price,
        userId: cart.userId,
        status: cart.status,
        productId: cart.productId,
      }
    })

    res.json({ mas: 'cartclone is status : ', cartclone})
  }catch(err){
    next(err)
  }
}






// exports.order = async (req, res, next) => {
//   const { cartIds, date, userId, status } = req.body;
//   console.log(cartIds, date, userId, status);
//   try {
//     const newOrder = await db.order.create({
//       data: {
//         date: new Date(date),
//         status,
//         userId: userId,
//         orderCarts: {
//           create: cartIds.map(cartId => ({
//             cartId: cartId
//           }))
//         }
//       }
//     });

//     console.log('New Order:', newOrder);
//     res.status(201).json(newOrder);
//   } catch (error) {
//     console.error('Error creating order:', error);
//     res.status(500).json({ message: 'Internal server error' });
//     next(error);
//   }
// };

