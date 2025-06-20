const Like = require('../models/likeModel');
const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const { handleError } = require('../helpers/handleError');
const { sendMailToAuthor } = require('../helpers/email');

exports.AddLike = async (req, res, next) => {
    try {

        const { author, blogId } = req.body;

        // Check if already liked
        let isLiked = await Like.findOne({ author, blogId });

        let action = '';
        if (!isLiked) {
            // Add new like
            await Like.create({ author, blogId });
                action = 'liked';
        } 
        else {
            // Remove like
            await Like.findByIdAndDelete(isLiked._id);
            action = 'unliked';
        }

        // Count updated likes
        const likeCount = await Like.countDocuments({ blogId });

        res.status(200).json({
            success: true,
            likeCount,
            message: `Blog ${action} successfully.`,
        });

        // Fetch blog and user details
        const blog = await Blog.findById(blogId).populate('author', 'name email').populate('category', 'title slug');
        const liker = await User.findById(author);

        if (!blog || !blog.author || !liker) {
            return;
        }

        // Only send email if liked (not unliked)
        if (action === 'liked') {
        
            const to = blog.author.email;
            const subject = `👍 New Like on Your Blog: ${blog.title}`;

            const html = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #3A59D1; color: white; padding: 16px 24px;">
                    <h2 style="margin: 0;">❤️ BlogBrew | Someone Liked Your Blog!</h2>
                    </div>
                
                    <div style="padding: 20px; background-color: #fdfdfd;">
                    <img src="${blog.featureImage}" alt="Blog Feature Image" style="width: 100%; max-height: 250px; object-fit: cover; border-radius: 5px; margin-bottom: 20px;" />
                
                    <p style="font-size: 16px; margin-bottom: 10px;">
                        Hello <strong>${blog.author.name}</strong>,
                    </p>
                
                    <p style="font-size: 16px; margin-bottom: 10px;">
                        <strong>${liker.name}</strong> liked your blog post.
                    </p>
                
                    <p style="font-size: 18px; font-weight: bold; margin: 10px 0;">📝 ${blog.title}</p>
                
                    <div style="margin-top: 30px;">
                        <a href="https://blogbrew.vercel.app/blog/${blog.category.slug}/${blog.slug}" style="display: inline-block; background-color: #3A59D1; color: #fff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                        🔗 View Blog Post
                        </a>
                    </div>
                
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
                
                    <p style="font-size: 13px; color: #888; text-align: center;">
                        You received this because you're the author of this blog on BlogBrew.
                    </p>
                    </div>
                </div>
            `;

            const text = `${liker.name} just liked your blog "${blog.title}". Check it out: http://localhost:5173/blog/${blog.category.slug}/${blog.slug}`;

            await sendMailToAuthor({ to, subject, html, text });
        }

        } catch (error) {
            next(handleError(500, `Error occurred while adding like, ${error.message}`));
        }
};