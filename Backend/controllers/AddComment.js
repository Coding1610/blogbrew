const Comment = require('../models/commentModel');
const {handleError} = require('../helpers/handleError');

exports.AddComment = async(req,res,next) => {

    try {   
        const {author, blogId, comment} = req.body;
        const newComment = await Comment.create({author,blogId,comment});
        res.status(200).json(
            {
                success:true,
                message:"Comment added successfully",
                newComment
            }
        )

    } catch (error) {
        next(handleError(500, `Error occure while adding comment, ${error.message}`));
    }

};