const express = require('express');
const router = express.Router();
const publicationCtrl = require('../controllers/publication');
const auth = require('../middleware/auth');
const authadmin = require('../middleware/authadmin');


router.post('/publish', auth, publicationCtrl.publish);
router.get('/', auth, publicationCtrl.publications);
router.delete('/:id', authadmin, publicationCtrl.delete);

module.exports = router;