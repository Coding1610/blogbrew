const Blog = require('../models/blogModel');
const {handleError} = require('../helpers/handleError');

exports.GetRelatedBlog = async(req,res,next) => {

    try {   
        const {category} = req.params;
        const blog = await Blog.find({category}).lean().exec(); 
        res.status(200).json({
            success:true,
            message:"Related Blogs are Fteched Successfully",
            blog
        });
    } catch (error) {
        next(handleError(500, `Error occure while fetching related Blogs, ${error.message}`));
    }

};