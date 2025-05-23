const {handleError} = require('../helpers/handleError');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// GoogleAuth Controller
exports.GoogleAuth = async(req,res,next) => {

    try {

        // fetch data
        const {name,email,avatar} = req.body;

        // check email is present or not
        const isEmail = await User.findOne({email});

        const finalUser = isEmail

        // absent then
        if(!isEmail){
            // create new user
            const password = Math.round(Math.random()*1000000).toString();
            const hashPassword = await bcrypt.hash(password,10);
            finalUser = await User.create({name,email,password:hashPassword,avatar});
        }

        // create jwt 
        const token = jwt.sign({
            _id:finalUser._id,
            name:finalUser.name,
            email:finalUser.email,
            avatar:finalUser.avatar
        },process.env.JWT_SECRET_KEY);

        // create cookie
        res.cookie('cookie-name', token , {
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path:'/'
        });

        finalUser.password = undefined;

        // response send
        res.status(200).json(
            {
                success:true,
                message:"Login Successfully",
                user:finalUser
            }
        );

    } catch(error) {
        return next(handleError(500,error.message));
    }
}
