const Like = require('../models/likeModel');
const {handleError} = require('../helpers/handleError');

exports.AddLike = async(req,res,next) => {

    try {   
        const {author, blogId} = req.body;
        
        let isLiked;
        isLiked = await Like.findOne({author, blogId});
        
        // if not like then add new like
        if(!isLiked){
            const newLike = await Like.create({author,blogId});
        }
        // if like then delete that like
        else{
            await Like.findByIdAndDelete(isLiked._id);
        }

        // count total number of likes for any blog
        const likeCount = await Like.countDocuments({blogId});

        res.status(200).json(
            {
                success:true,
                likeCount
            }
        )

    } catch (error) {
        next(handleError(500, `Error occure while adding like, ${error.message}`));
    }

};