const Category = require('../models/categoryModel');
const handleError = require('../helpers/handleError');

exports.AddCategory = async(req,res,next) => {

    try {   

        const {name,slug} = req.body;
        const newCategory = await Category.create({name,slug});
        res.status(200).json(
            {
                success:true,
                message:"Category added successfully",
                newCategory
            }
        )

    } catch (error) {
        next(handleError(500, `Error occure while adding new Category, ${error.message}`));
    }

};