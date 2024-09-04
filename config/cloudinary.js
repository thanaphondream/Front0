const cloudinary = require('cloudinary').v2;

cloudinary.config({
        cloud_name: 'dia5r0v7r', 
        api_key: '473563196226113', 
        api_secret: process.env.CLOUDINARY_SECRET,
    
});

module.exports = cloudinary;