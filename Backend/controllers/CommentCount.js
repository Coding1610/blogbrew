const Comment = require('../models/commentModel');
const {handleError} = require('../helpers/handleError');

exports.CommentCount = async(req,res,next) => {

    try {  
        const {blogId} = req.params;
        const commentCount = await Comment.countDocuments({blogId});
        res.status(200).json(
            {
                success:true,
                message:"Comments Fetched successfully",
                commentCount
            }
        )

    } catch (error) {
        next(handleError(500, `Error occure while counting comment, ${error.message}`));
    }

};