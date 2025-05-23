const {handleError} = require('../helpers/handleError');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Sign-Up Controller
exports.Register = async(req,res,next) => {
    
    try {
        // fetch data
        const{name,email,password} = req.body;

        // validate input
        if( !name || !email || !password ){
            return next(handleError(400,"Please fill all the fields."));
        }
        
        // email is already present ot not
        const checkUser = await User.findOne({email});
        
        // already entry with email then
        if(checkUser){
           return next(handleError(409,"User Already Registered"));
        }

        // encrypt password
        const hashpassword = await bcrypt.hash(password,10);

        // new user creation
        const newUser = await User.create({name,email,password:hashpassword});

        // response send
        res.status(200).json(
            {
                success:true,
                message:"Registration Successfully",
                newUser
            }
        );

    } catch(error) {
        return next(handleError(500,error.message));
    }
}
