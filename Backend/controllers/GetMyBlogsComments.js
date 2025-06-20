const Blog = require('../models/blogModel');
const Comment = require('../models/commentModel');
const {handleError} = require('../helpers/handleError');

exports.GetMyBlogsComments = async (req, res, next) => {
    
    try {
        const { id } = req.params;
    
        // Get blog IDs authored by this user
        const blogs = await Blog.find({ author: id }).select('_id').lean();
    
        const blogIds = blogs.map(blog => blog._id);
    
        // Fetch all comments for those blog IDs
        const comments = await Comment.find({ blogId: { $in: blogIds } })
            .populate('author', 'name')
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