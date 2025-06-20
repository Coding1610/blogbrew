const Blog = require('../models/blogModel');
const {handleError} = require('../helpers/handleError');

exports.ShowAllBlogs = async(req,res,next) => {

    try {   
        const blog = await Blog.find().populate('author','name avatar role').populate('category','name slug').sort({createdAt:-1}).lean().exec(); // -1 means latest at top
        if(!blog){
            return next(handleError(404, "Blogs not found."));
        }
        res.status(200).json(
            {
                success:true,
                message:"Blogs Fetched Successfully.",
                blog
            }
        )
    } catch (error) {
        next(handleError(500, `Error occure while fetching Blogs, ${error.message}`));
    }

};