const {handleError} = require('../helpers/handleError');
const Category = require('../models/categoryModel');

exports.DeleteCategory = async(req,res,next) => {

    try {

        const {categoryId} = req.params;
        const deleteCategory = await Category.findByIdAndDelete(categoryId);

        res.status(200).json(
            {
                success:true,
                message:"Category Deleted Successfully",
                category:deleteCategory,
            }
        )

    } catch (error) {
        next(handleError(500,`Error, ${error.message}`))
    }

};