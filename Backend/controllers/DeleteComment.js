const {handleError} = require('../helpers/handleError');
const Comment = require('../models/commentModel');

exports.DeleteComment = async(req,res,next) => {

    try {

        const {commentId} = req.params;
        const deleteComment = await Comment.findByIdAndDelete(commentId);

        res.status(200).json(
            {
                success:true,
                message:"Comment Deleted Successfully",
                deleteComment,
            }
        )

    } catch (error) {
        next(handleError(500,`Error, ${error.message}`))
    }

};