const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');


router.post('/publish', auth, commentCtrl.publish)

module.exports = router;