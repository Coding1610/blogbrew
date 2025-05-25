const Category = require('../models/categoryModel');
const handleError = require('../helpers/handleError');

exports.ShowAllCategory = async(req,res,next) => {

    try {
        const categories = await Category.find().sort({name:1}).lean().exec(); // find all --> sort by name --> ascending order --> convert plan js --> execute query
        if(!categories){
            next(handleError(404,'No categories found'));
            return;
        }
        res.status(200).json(
            {
                success:true,
                message:"All categories fetched successfully",
                data:categories
            }
        )

    } catch (error) {
        next(handleError(500,`Error occure while fetching all Category, ${error.message}`));
    }

};