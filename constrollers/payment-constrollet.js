const db = require("../models/db");
const cloudupload = require("../utils/cloudupload");

exports.payment = async (req, res, next) => {
    try{
        const { date, userId, status, all_price,orderId ,locationId, make_payment } =req.body
        console.log("dfsf112211",date, userId, status, all_price)

        const payment = await db.payment.create({
            data: {
                date: new Date(date),
                user: {
                    connect: {
                        id: userId
                    }
                },
                status: status,
                all_price: all_price,
                order: {
                    connect: {
                        id: orderId
                    }
                },
                location: {
                    connect: {
                        id: locationId
                    }
                }, 
                make_payment,
            }
        })
        res.json({ message: "Payment successful", payment })
    }catch(err){
        next(err)
    }
}
exports.getpayment = async (req, res, next) => {
    try{
        const payment = await db.payment.findMany({
            include: {
                user: true,
                order: true,
                location: true
            }
        })
        res.json({ payment })
    }catch(err){
        next(err)
    }
};

exports.putstatuspaymentbyid = async (req, res, next) => {
    try {
        const { paymentId, status } = req.body
        const payment = await db.payment.update({
            where: {
                id: paymentId
            },
            data: {
                status: status
            }
        })
        res.json({ message: "Payment status updated successfully", payment: payment })
        
    } catch (err) {
        next(err)
    }
}

exports.paymentmats = async (req, res, next) => {
    try {
        const { pay, paymentId } = req.body;
        
        // Validate required fields
        if (!pay || !paymentId) {
            return res.status(400).json({ msg: "pay and paymentId are required" });
        }
        
        // Validate files presence
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ msg: "No files uploaded" });
        }

        // Upload images to the cloud
        const imagePromise = req.files.map(file => cloudupload(file.path));
        const imageUrlArray = await Promise.all(imagePromise);
        const imageUrl = imageUrlArray[0]; // Assuming you want only the first image

        // Create a payment transfer record in the database
        const transfers = await db.transfer_Payment.create({
            data: {
                pay,
                image: imageUrl,
                payment: {
                    connect: {
                        id: paymentId
                    }
                }
            }
        });

        res.json({ msg: "This is Ok: ", transfers });
    } catch (err) {
        // Pass the error to the next middleware
        next(err);
    }
};
