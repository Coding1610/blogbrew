const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

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

// create routes
router.post('/register', Register);
router.post('/login', Login);
router.post('/google-auth', GoogleAuth);
router.get('/logout', Logout);
router.get('/get-user/:userid', GetUser);
router.put('/update-user/:userid', upload.single('file'), UpdateUser);
router.post('/category/add', AddCategory);
router.put('/category/edit/:categoryId', EditCategory);
router.get('/category/show/:categoryId', FetchCategory);
router.delete('/category/delete/:categoryId', DeleteCategory);
router.get('/category/show-all', ShowAllCategory);
router.post('/blog/add', upload.single('file'), AddBlog);
router.get('/blog/edit/:blogId', EditBlog);
router.delete('/blog/delete/:blogId', DeleteBlog);
router.get('/blog/show-all', ShowAllBlogs);
router.put('/blog/update/:blogId',upload.single('file'), UpdateBlog);
router.get('/blog/get-blog/:slug', GetBlogDetails);

module.exports = router;