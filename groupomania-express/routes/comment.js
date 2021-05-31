const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const authadmin = require('../middleware/authadmin');


router.post('/publish', auth, commentCtrl.publish);
router.post('/delete:id', authadmin, commentCtrl.delete);

module.exports = router;