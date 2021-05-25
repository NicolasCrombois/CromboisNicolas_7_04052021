const express = require('express');
const router = express.Router();
const publicationCtrl = require('../controllers/publication');
const auth = require('../middleware/auth');


router.post('/publish', auth, publicationCtrl.publish)
router.get('/'/*, auth*/, publicationCtrl.publications)

module.exports = router;