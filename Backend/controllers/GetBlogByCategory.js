const Blog = require('../models/blogModel');
const Category = require('../models/categoryModel');
const {handleError} = require('../helpers/handleError');

exports.GetBlogByCategory = async(req,res,next) => {

    try {  
        const {category} = req.params;
        
        const categoryData = await Category.findOne({slug:category});
        
        if(!categoryData){
            return next(handleError(404,'Category Data not found'));
        }
        
        const categoryId = categoryData._id;
        
        const blog = await Blog.find({category:categoryId}).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec();
        
        res.set('Cache-Control', 'no-store');
        res.status(200).json({
            success:true,
            message:"Category based Blogs are Fteched Successfully",
            blog,
            categoryData
        });
    
    } catch (error) {
        next(handleError(500, `Error occure while fetching category based Blogs, ${error.message}`));
    }

};