const User = require('../models/userModel');
const {handleError} = require('../helpers/handleError');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;

exports.UpdateUser = async(req,res,next) => {

    try{

        const data = JSON.parse(req.body.data);
        const {userid} = req.params;
        const user = await User.findById(userid);

        if(!user){
            return res.status(404).json(
                {
                    success:false,
                    message: "User Data Not Found"
                }
            )
        };

        user.name = data.name;
        user.email = data.email;
        user.bio = data.bio;
        
        if( data.password && data.password.length >= 8 ){
            user.password = await bcrypt.hash(data.password,10);
        }

        if(req.file){

            const uploadResult = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder:"blogbrew",
                    resource_type:"image"
                }
            ).catch((error) => {
                console.log("Cloudinary Upload Error:", error.message);
                return next(handleError(500, "Image Upload Failed"));
            });

            user.avatar = uploadResult.secure_url;
        }

        await user.save();

        user.password = undefined;

        res.status(200).json(
            {
                success:true,
                message:"Data Updated successfully",
                user
            }
        );
    
    } catch(error){
        console.log("Error", error.message);
        return next(handleError(500,error.message));
    }
};