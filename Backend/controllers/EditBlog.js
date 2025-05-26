const Blog = require('../models/blogModel');
const {handleError} = require('../helpers/handleError');

exports.EditBlog = async(req,res,next) => {

    try {   
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId).populate('category','name');
        if(!blog){
            next(handleError(404,'No blog found'));
            return;
        }
        res.status(200).json(
            {
                success:true,
                message:"Blog fetched successfully",
                blog
            }
        )
    } catch (error) {
        next(handleError(500, `Error occure while modifying Blog, ${error.message}`));
    }

};