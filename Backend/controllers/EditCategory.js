const {handleError} = require('../helpers/handleError');
const Category = require('../models/categoryModel');

exports.EditCategory = async(req,res,next) => {

    try {

        const {categoryId} = req.params;
        const {name,slug} = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(categoryId,{name,slug},{new:true});

        res.status(200).json(
            {
                success:true,
                message:"Category Updated Successfully",
                category:updatedCategory,
            }
        )

    } catch (error) {
        next(handleError(500,`Error, ${error.message}`))
    }

};