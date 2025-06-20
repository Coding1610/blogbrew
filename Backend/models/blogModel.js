const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true,
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    featureImage:{
        type:String,
        required:true,
        trim:true,
    },
    blogContent:{
        type:String,
        required:true,
        trim:true,
    },
},{timestamps:true});

const Blog = mongoose.model('Blog', blogSchema, 'blogs'); //(modelName, schemaName, collectionName)
module.exports = Blog;