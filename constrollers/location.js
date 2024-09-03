const db = require("../models/db");

exports.addlocation = async (req , res , next) => {
    try{

        const {provinces, amphures, districts, zip_code, road, village , house_number, other ,usersId}= req.body
        const newLocation = await db.location.create({
            data: {
                provinces,
                amphures,
                districts,
                zip_code: parseInt(zip_code),
                road,
                village,
                house_number,
                other,
                usersId,
            }
        })
        res.json(newLocation)
    }catch(error){
        next(error);
    }
}

exports.getlocationsbyuser = async (req , res , next) => {
    try{
        const locations = await db.location.findMany({
            where: {
                // usersId: req.params.userId
                usersId: req.user.id,
            }
        })
        res.json(locations)
    }catch(error){
        next(error);
    }
}