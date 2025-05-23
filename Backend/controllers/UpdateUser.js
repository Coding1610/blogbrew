const User = require('../models/userModel');
const {handleError} = require('../helpers/handleError');
const bcrypt = require('bcrypt');

console.log("Routes 3");

exports.UpdateUser = async(req,res,next) => {

    console.log("Hellllooo");

    try{

        console.log("Hello 1");

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
        
        console.log("Hello 2");

        user.name = data.name;
        user.email = data.email;
        user.bio = data.bio;
        
        console.log("Hello 3");

        if( data.password && data.password.length >= 8 ){
            user.password = await bcrypt.hash(data.password,10);
        }

        await user.save();
        
        console.log("Hello 4");

        res.status(200).json(
            {
                success:true,
                message:"Data Uploaded successfully",
                user
            }
        );

        console.log("Hello 6");
    
    } catch(error){
        console.log("Error", error.message);
        return next(handleError(990,error.message));
    }
};