const {handleError} = require('../helpers/handleError');    
require('dotenv').config();

// Logout Controller
exports.Logout = async(req,res,next) => {

    try {

        // create cookie
        res.clearCookie('cookie-name', {
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path:'/'
        });

        // response send
        res.status(200).json(
            {
                success:true,
                message:"Logout Successfully",
            }
        );

    } catch(error) {
        return next(handleError(500,error.message));
    }

}