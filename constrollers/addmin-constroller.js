const db = require("../models/db");
// const {Status} = require ("@prisma/client")
const cloudupload = require("../utils/cloudupload");

exports.addproduct = async (req, res, next) => {
  
  try {
    const { name, image, category, price, store } = req.body;
    console.log(name, image, category, price, store)
    const imagePromise = req.files.map((file) => {
      return cloudupload(file.path);
    });
    const imageUrlArray = await Promise.all(imagePromise);
    const imageUrl = imageUrlArray[0];
    const data = {
      name,
      image: imageUrl,
      category,
      price: Number(price),
      store: parseInt(store),
    };
    const rs = await db.product.create({ data });
    console.log(rs);
    res.json({ msg: "AddProduct successful" });
  } catch (err) {
    next(err);
  }
};



exports.getproduct = async (req, res, next) =>{
  
  try {
    const getproduct = await db.product.findMany({
      
    })
    res.json({getproduct})
  } catch (err) {
    next(err);
  }
}



exports.deleteproduct = async (req, res , next) => {
  const {id} = req.params;
  console.log(id);
  try{
    const rs = await db.product.delete({
        where:{ id: id}
    })
    res.json({message : "Deleted product", result : rs})
     
  }catch(err){
      next(err)
  }
}

exports.updateproduct = async (req, res , next) => {
  const {id} = req.params;
  try{
      const rs = await db.product.update({
          where:{ id : id },
          data : req.body
      })
      res.json({message : "Updated product", result : rs})
  }catch(err){
      next(err)
  }
}


exports.productstoreedit = async (req, res, next) => {
  try{
    const { id } = req.params
    const { store } = req.body
    const product = await db.product.update({
      where: {
        id: id
      },data:{
        store
      }
    })

    res.json({msg: 'Product UpdateStore ThisOk :', product})
  }catch(err){
    next(err)
  }
}

exports.productedit = async (req, res, next) => {
  try{
    const { id } = req.params
    const {name , image ,  category, price , store } = req.body
    const imagePromise = req.files.map((file) => {
      return cloudupload(file.path);
    });
    const imageUrlArray = await Promise.all(imagePromise);
    const imageUrl = imageUrlArray[0];
    const product = await db.product.update({
      where: {
        id: id
      },data:{
        name,
        image: imageUrl,
        category,
        price: Number(price),
        store: parseInt(store),
      }
    })
    res.json({msg: 'Product Update ThisOk :', product})
  }catch(err){
    next(err)
  }
}

exports.productshowId = async (req, res, next) => {
  try{

    const { id } = req.params
    console.log(id)
    const product = await db.product.findFirst({
      where: {
        id: id
      }
    })
    res.json(product)
  }catch(err){
    next(err)
  }
}

exports.getorder = async (req, res, next) => {
  try{
    
    const order = await db.order.findMany({
      include:{
        orderCarts: {
          
          include: {
            cartclone: {
              
              include: {
                
                product: true,
                user : true,
                
              },
              
            }
          }
        }
      }
    })
    res.json(order)
  }catch(err){
    next(err)
  }
}