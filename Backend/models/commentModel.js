const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
        required:true,
    },
    comment:{
        type:String,
        required:true,
        trim:true,
    }
},{timestamps:true});

const Comment = mongoose.model('Comment', commentSchema, 'comments'); //(modelName, schemaName, collectionName)
module.exports = Comment;