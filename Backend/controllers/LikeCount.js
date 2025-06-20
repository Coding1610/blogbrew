const Like = require('../models/likeModel');
const {handleError} = require('../helpers/handleError');

exports.LikeCount = async(req,res,next) => {

    try {  
        const {blogId,author} = req.params;
        const Likes = await Like.countDocuments({blogId});
        let userLiked = false;
        if(author){
            const getUserLike = await Like.countDocuments({blogId,author});
            if(getUserLike > 0){
                userLiked = true;
            }
        }   
        res.status(200).json(
            {
                success:true,
                message:"Likes Counted successfully",
                Likes,
                userLiked
            }
        )

    } catch (error) {
        next(handleError(500, `Error occure while counting Like, ${error.message}`));
    }

};