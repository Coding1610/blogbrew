const Category = require('../models/categoryModel');
const {handleError} = require('../helpers/handleError');

exports.FetchCategory = async(req,res,next) => {

    try {
        const {categoryId} = req.params;
        console.log(categoryId);
        const category = await Category.findById(categoryId);
        if(!category){
            next(handleError(404,'No category found'));
            return;
        }
        res.status(200).json(
            {
                success:true,
                message:"Category fetched successfully",
                category
            }
        )
    } catch (error) {
        next(handleError(500,`Error occure while fetching Category, ${error.message}`));
    }

};