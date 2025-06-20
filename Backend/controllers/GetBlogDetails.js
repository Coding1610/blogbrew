const Blog = require('../models/blogModel');
const {handleError} = require('../helpers/handleError');

exports.GetBlogDetails = async(req,res,next) => {

    try {   
        const {slug} = req.params;
        const blog = await Blog.findOne({slug}).populate('author', 'name avatar role').populate('category', 'name slug'); 
        res.status(200).json({
            success:true,
            message:"Blog Fteched Successfully",
            blog
        });
    } catch (error) {
        next(handleError(500, `Error occure while fetching Blog, ${error.message}`));
    }

};