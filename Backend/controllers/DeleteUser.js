const User = require('../models/userModel');
const Blog = require('../models/blogModel');
const Like = require('../models/likeModel');
const Comment = require('../models/commentModel');
const {handleError} = require('../helpers/handleError');

exports.DeleteUser = async(req,res,next) => {

    try {
        const {id} = req.params;

        // Delete likes made by the user
        await Like.deleteMany({author:id});
        // Delete all comments made by the user
        await Comment.deleteMany({author:id});
        // Delete all blogs created by the user
        await Blog.deleteMany({author:id});
        // Delete the user itself
        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser){
            return next(handleError(404,'User Not Found'));
        }

        res.status(200).json(
            {
                success:true,
                message:"User and related data deleted Successfully",
                deletedUser
            }
        )

    } catch (error) {
        next(handleError(500,`Error, ${error.message}`))
    }

};