const Comment = require('../models/commentModel');
const {handleError} = require('../helpers/handleError');

exports.GetComments = async(req,res,next) => {

    try {  
        const {blogId} = req.params;
        const comments = await Comment.find({blogId}).populate('author', 'avatar name').sort({createdAt:1}).lean().exec();
        res.status(200).json(
            {
                success:true,
                message:"Comment Fetched successfully",
                comments
            }
        )

    } catch (error) {
        next(handleError(500, `Error occure while fetching comment, ${error.message}`));
    }

};