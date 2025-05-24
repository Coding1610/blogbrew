// Require the Cloudinary library
const cloudinary = require('cloudinary').v2;

// function for connecting to cloudinary
exports.cloudinaryConnect = () => {

    try{
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET
        });
    }   
    catch(error){
        console.log(`Error connecting to cloudinary: ${error.message}`);
    }
    
};