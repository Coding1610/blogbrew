const {handleError} = require('../helpers/handleError');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Sign-In Controller
exports.Login = async(req,res,next) => {

    try {

        // fetch data
        const {email,password} = req.body;

        // check email is present or not
        const isEmail = await User.findOne({email});

        // absent then
        if(!isEmail){
            return next(handleError(404,"Email not found."));
        }

        // present then
        // compare password
        const isPassword = await bcrypt.compare(password,isEmail.password);

        // not match then
        if(!isPassword){
            return next(handleError(404,"Incorrect Password."));
        }

        // create jwt 
        const token = jwt.sign({
            _id:isEmail._id,
            name:isEmail.name,
            email:isEmail.email,
            avatar:isEmail.avatar,
            role:isEmail.role,
        },process.env.JWT_SECRET_KEY);

        // create cookie
        res.cookie('cookie_name', token , {
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
            path:'/'
        });

        isEmail.password = undefined;

        // response send
        res.status(200).json(
            {
                success:true,
                message:"Login Successfully",
                user:isEmail
            }
        );

    } catch(error) {
        return next(handleError(500,error.message));
    }
}
