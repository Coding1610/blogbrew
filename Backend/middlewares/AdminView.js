const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {handleError} = require('../helpers/handleError');

exports.AdminView = async(req,res,next) => {

    try {       
        const token = req.cookies.cookie_name;

        if(!token){
            return next(handleError(456,'Unathorized'));
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const id = '68428b6fbf2fa988d8358673';
       
        const freshUser = await User.findById(id);
        
        if(freshUser.role !== decodeToken.role) {
            decodeToken.role = freshUser.role;
        }

        if(decodeToken.role === 'Admin'){
            req.user = decodeToken;
            next();
        }
        else{
            return next(handleError(403,'Unathorized'));
        }

    } catch (error) {
        next(handleError(500, error.message));
    }   

};