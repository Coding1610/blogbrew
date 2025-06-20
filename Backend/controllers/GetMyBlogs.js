const Blog = require('../models/blogModel');
const {handleError} = require('../helpers/handleError');

exports.GetMyBlogs = async(req,res,next) => {

    try {   
        const {id} = req.params;
        const blog = await Blog.find({author:id}).populate('category','name slug').sort({createdAt:-1}).lean().exec(); 
        res.status(200).json({
            success:true,
            message:"Your Blogs are Fteched Successfully",
            blog
        });
    } catch (error) {
        next(handleError(500, `Error occure while fetching your Blog, ${error.message}`));
    }

};