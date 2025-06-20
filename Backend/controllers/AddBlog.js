const Blog = require('../models/blogModel');
const {handleError} = require('../helpers/handleError');
const cloudinary = require('cloudinary').v2;
const {encode} = require("entities");

exports.AddBlog = async(req,res,next) => {

    try {       

        let featureImage = '';
        const data = JSON.parse(req.body.data);

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

        const blog = await Blog.create({
            author:data.author,
            category:data.category,
            title:data.title,
            slug:data.slug,
            featureImage:featureImage,
            blogContent:encode(data.blogContent)
        });

        res.status(200).json(
            {
                success:true,
                message:"Blog Added Successfully.",
                blog
            }
        )

    } catch (error) {
        next(handleError(500, `Error occure while adding new Blog, ${error.message}`));
    }

};