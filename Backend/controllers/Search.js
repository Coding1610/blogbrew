const Blog = require('../models/blogModel');
const {handleError} = require('../helpers/handleError');

exports.Search = async(req,res,next) => {

    try {  
        const {q} = req.query;
        
        const blog = await Blog.find({title:{$regex : q, $options : 'i'}}).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec();
        
        res.set('Cache-Control', 'no-store');
        res.status(200).json({
            success:true,
            message:"Related Blogs are Fteched Successfully",
            blog,
        });
    
    } catch (error) {
        next(handleError(500, `Error occure while fetching related Blogs, ${error.message}`));
    }

};