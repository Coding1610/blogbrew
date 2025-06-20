const User = require('../models/userModel');
const {handleError} = require('../helpers/handleError');

exports.GetUser = async(req,res,next) => {
    try{
        const {userid} = req.params;
        const user = await User.findOne({_id:userid}).lean().exec();
        if(!user){
            return next(handleError(404,'User Not Found'));
        }
        res.status(200).json({
            success:true,
            message:"User Data Found",
            user
        });
    } catch(error){
        return next(handleError(500,error.message));
    }
};