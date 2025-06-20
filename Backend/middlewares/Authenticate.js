const jwt = require('jsonwebtoken');
const {handleError} = require('../helpers/handleError');

exports.Authenticate = async(req,res,next) => {

    try {       
        const token = req.cookies.cookie_name;

        if(!token){
            return next(handleError(403,'Unathorized'));
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodeToken;
        next();

    } catch (error) {
        next(handleError(500, error.message));
    }   

};