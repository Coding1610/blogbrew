const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    role:{
        type:String,
        default:'User',
        enum:["User","Admin"],
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    bio:{
        type:String,
        trim:true
    },
    avatar:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true});

const User = mongoose.model('User', userSchema, 'users'); //(modelName, schemaName, collectionName)
module.exports = User;