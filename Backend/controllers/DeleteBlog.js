const Blog = require('../models/blogModel');
const {handleError} = require('../helpers/handleError');

exports.DeleteBlog = async(req,res,next) => {

    try {
        const {blogId} = req.params;
        
        const deletedBlog = await Blog.findByIdAndDelete(blogId);

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