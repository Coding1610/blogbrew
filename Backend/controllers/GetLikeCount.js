const Like = require('../models/likeModel');
const {handleError} = require('../helpers/handleError');

exports.GetLikeCount = async(req,res,next) => {

    try {  
        const {blogId} = req.params;
        const Likes = await Like.countDocuments({blogId}); 
        res.status(200).json(
            {
                success:true,
                message:"Likes Counted successfully",
                Likes,
            }
        )

    } catch (error) {
        next(handleError(500, `Error occure while counting Like, ${error.message}`));
    }

};