const Blog = require('../models/blogModel');
const Comment = require('../models/commentModel');
const {handleError} = require('../helpers/handleError');

exports.GetCommentsByMe = async (req, res, next) => {
    
    try {
        const { id } = req.params;
    
        // Fetch all comments for those blog IDs
        const comments = await Comment.find({ author:id })
            .populate('blogId', 'title')
            .sort({ createdAt: -1 })
            .lean();
    
        res.status(200).json({
            success: true,
            message: 'All comments fetched successfully',
            comments, 
        });
  
    } catch (error) {
        next(handleError(500, `Error occurred while fetching comments, ${error.message}`));
    }

};