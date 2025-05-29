const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
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
},{timestamps:true});

const Like = mongoose.model('Like', likeSchema, 'likes'); //(modelName, schemaName, collectionName)
module.exports = Like;