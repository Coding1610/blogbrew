const Blog = require('../models/blogModel');
const Like = require('../models/likeModel');
const Comment = require('../models/commentModel');

const {handleError} = require('../helpers/handleError');

exports.DeleteBlog = async(req,res,next) => {

    try {
        const {blogId} = req.params;
        
        // Delete comment for this blog
        await Comment.deleteMany({blogId:blogId});

        // Delete like for this blog
        await Like.deleteMany({blogId:blogId});

        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if(!deletedBlog){
            return next(handleError(404,"Blog not found"));
        }

        res.status(200).json(
            {
                success:true,
                message:"Blog Deleted Successfully",
                blog:deletedBlog
            }
        )

    } catch (error) {
        next(handleError(500, `Error occure while deleting Blog, ${error.message}`));
    }

};