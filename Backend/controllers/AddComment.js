const Comment = require('../models/commentModel');
const Blog = require('../models/blogModel'); 
const User = require('../models/userModel'); 
const { handleError } = require('../helpers/handleError');
const { sendMailToAuthor } = require('../helpers/email'); 

exports.AddComment = async (req, res, next) => {
  try {
    const { author, blogId, comment } = req.body;

    // 1. Save comment
    const newComment = await Comment.create({ author, blogId, comment });

    // 4. Response
    res.status(200).json({
      success: true,
      message: "Comment added Successfully",
      newComment
    });

    // 2. Fetch blog and user details
    const blog = await Blog.findById(blogId).populate('author','name email').populate('category','title slug');
    const commenter = await User.findById(author);

    if (!blog || !blog.author || !commenter) {
      return next(handleError(404, 'Author, blog, or commenter not found.'));
    }

    // 3. Send email to blog author
    const to = blog.author.email;
    const subject = `📝 New Comment on Your Blog : ${blog.title}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #3A59D1; color: white; padding: 16px 24px;">
          <h2 style="margin: 0;">📢 BlogBrew | New Comment</h2>
        </div>
    
        <div style="padding: 20px; background-color: #fdfdfd;">
          <img src="${blog.featureImage}" alt="Blog Feature Image" style="width: 100%; max-height: 250px; object-fit: cover; border-radius: 5px; margin-bottom: 20px;" />
    
          <p style="font-size: 16px; margin-bottom: 10px;">
            Hey <strong>${blog.author.name}</strong>,
          </p>
    
          <p style="font-size: 16px; margin-bottom: 10px;">
            <strong>${commenter.name}</strong> just dropped a new comment on your blog
          </p>
    
          <p style="font-size: 18px; font-weight: bold; margin: 10px 0;">📝 ${blog.title}</p>
    
          <blockquote style="border-left: 4px solid #3A59D1; margin: 20px 0; padding-left: 16px; color: #555; font-style: italic;">
            ${newComment.comment}
          </blockquote>
    
          <div style="margin-top: 30px;">
            <a href="https://blogbrew.vercel.app/blog/${blog.category.slug}/${blog.slug}" style="display: inline-block; background-color: #3A59D1; color: #fff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
              🔗 View Full Blog Post
            </a>
          </div>
    
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
    
          <p style="font-size: 13px; color: #888; text-align: center;">
            You received this notification because you're the author of this blog on BlogBrew.
          </p>
        </div>
      </div>
    `;
    const text = `New comment by ${commenter.name} on your blog "${blog.title}":\n\n${newComment.comment}`;

    await sendMailToAuthor({ to, subject, html, text });

  } catch (error) {
    next(handleError(500, `Error occurred while adding comment, ${error.message}`));
  }
};
