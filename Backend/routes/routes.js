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

// create routes
router.post('/register', Register);
router.post('/login', Login);
router.post('/google-auth', GoogleAuth);
router.get('/logout', Logout);
router.get('/get-user/:userid', GetUser);
router.put('/update-user/:userid', upload.single('file'), UpdateUser);

module.exports = router;