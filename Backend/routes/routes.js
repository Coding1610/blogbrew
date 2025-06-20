const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

// import middleware
const {Authenticate} = require('../middlewares/Authenticate');
const {AdminView} = require('../middlewares/AdminView');

// import handler
const {Register} = require('../controllers/Register');
const {Login} = require('../controllers/Login');
const {GoogleAuth} = require('../controllers/GoogleAuth');
const {Logout} = require('../controllers/Logout');
const {GetUser} = require('../controllers/GetUser');
const {UpdateUser} = require('../controllers/UpdateUser');
const {AddCategory} = require('../controllers/AddCategory');
const {EditCategory} = require('../controllers/EditCategory');
const {FetchCategory} = require('../controllers/FetchCategory');
const {DeleteCategory} = require('../controllers/DeleteCategory');
const {ShowAllCategory} = require('../controllers/ShowAllCategory');
const {AddBlog} = require('../controllers/AddBlog');
const {EditBlog} = require('../controllers/EditBlog');
const {DeleteBlog} = require('../controllers/DeleteBlog');
const {ShowAllBlogs} = require('../controllers/ShowAllBlogs');
const {UpdateBlog} = require('../controllers/UpdateBlog');
const {GetBlogDetails} = require('../controllers/GetBlogDetails');
const {AddComment} = require('../controllers/AddComment');
const { GetComments } = require('../controllers/GetComments');
const { CommentCount } = require('../controllers/CommentCount');
const { AddLike } = require('../controllers/AddLike');
const { LikeCount } = require('../controllers/LikeCount');
const { GetRelatedBlog } = require('../controllers/GetRelatedBlog');
const { GetBlogByCategory } = require('../controllers/GetBlogByCategory');
const { Search } = require('../controllers/Search');
const { GetAllComments } = require('../controllers/GetAllComments');
const {DeleteComment} = require('../controllers/DeleteComment');
const { GetAllUsers } = require('../controllers/GetAllUsers');
const { DeleteUser } = require('../controllers/DeleteUser');
const {GetMyBlogs} = require('../controllers/GetMyBlogs');
const {GetMyBlogsComments} = require('../controllers/GetMyBlogsComments');
const { GetCommentsByMe } = require('../controllers/GetCommentsByMe');
const { GetLikeCount } = require('../controllers/GetLikeCount');

// create routes
router.post('/register', Register);
router.post('/login', Login);
router.post('/google-auth', GoogleAuth);
router.get('/logout', Authenticate, Logout);

// Authentication Route
router.get('/get-user/:userid', Authenticate, GetUser);
router.put('/update-user/:userid', Authenticate, upload.single('file'), UpdateUser);
router.get('/get-all-users', Authenticate, GetAllUsers);
router.delete('/user/delete/:id', Authenticate, DeleteUser);

// Category Routes
router.post('/category/add', AdminView, AddCategory);
router.put('/category/edit/:categoryId', AdminView, EditCategory);
router.get('/category/show/:categoryId', AdminView, FetchCategory);
router.delete('/category/delete/:categoryId', AdminView, DeleteCategory);
router.get('/category/show-all', ShowAllCategory);

// Blog Routes
router.post('/blog/add', Authenticate, upload.single('file'), AddBlog);
router.get('/blog/edit/:blogId', Authenticate, EditBlog);
router.put('/blog/update/:blogId', Authenticate, upload.single('file'), UpdateBlog);
router.delete('/blog/delete/:blogId', Authenticate, DeleteBlog);
router.get('/blog/show-all', ShowAllBlogs);
router.get('/blog/get-blog/:slug', GetBlogDetails);
router.get('/related-blog/:category', GetRelatedBlog);
router.get('/blog/get-blog-by-category/:category', GetBlogByCategory);

// Search Route
router.get('/blog/search', Search);

// Like Routes
router.post('/blog/like/add', Authenticate, AddLike);
router.get('/blog/:blogId/likes-count/:author', LikeCount);
router.get('/blog/likes/:blogId', GetLikeCount);

// Comments Route
router.post('/blog/comment/add', Authenticate, AddComment);
router.get('/blog/:blogId/comments', GetComments);
router.get('/blog/:blogId/comments-count', CommentCount);
router.get('/get-all-comments', Authenticate, GetAllComments);
router.delete('/comment/delete/:commentId', Authenticate, DeleteComment);

// Client Blog Routes
router.get('/blog/get-my-blogs/:id', Authenticate, GetMyBlogs);
router.get('/blog/commets-on-my-blogs/:id', Authenticate, GetMyBlogsComments);
router.get('/blog/comments-by-me/:id', Authenticate, GetCommentsByMe);

module.exports = router;