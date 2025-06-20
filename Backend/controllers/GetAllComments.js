const Comment = require('../models/commentModel');
const {handleError} = require('../helpers/handleError');

exports.GetAllComments = async(req,res,next) => {

    try {  
        const allComments = await Comment.find().populate('author', 'name').populate('blogId', 'title');
        res.status(200).json(
            {
                success:true,
                message:"All Comments Fetched successfully",
                allComments
            }
        )

    } catch (error) {
        next(handleError(500, `Error occure while fetching all comments, ${error.message}`));
    }

};