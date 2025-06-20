const Blog = require('../models/blogModel');
const {handleError} = require('../helpers/handleError');
const cloudinary = require('cloudinary').v2;
const {encode} = require("entities");

exports.UpdateBlog = async(req,res,next) => {

    try {       

        const {blogId} = req.params;

        const data = JSON.parse(req.body.data);
        
        const blog = await Blog.findById(blogId);

        blog.category = data.category;
        blog.title = data.title;
        blog.slug = data.slug;
        blog.blogContent = encode(data.blogContent);
        
        let featureImage = blog.featureImage;

        if(req.file){
            const uploadData = await cloudinary.uploader
            .upload(
                req.file.path,
                {folder:'blogbrew', resource_type:'image'}
            )
            .catch((error) => {
                next(handleError(500,error.message));
            });
            featureImage = uploadData.secure_url;
        }

        blog.featureImage = featureImage;

        await blog.save();

        res.status(200).json(
            {
                success:true,
                message:"Blog Updated Successfully.",
                blog
            }
        )

    } catch (error) {
        next(handleError(500, `Error occure while adding new Blog, ${error.message}`));
    }

};