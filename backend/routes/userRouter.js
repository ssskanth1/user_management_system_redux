var express = require('express');
var router = express.Router();
const userMiddleware = require('../middlewares/userMiddleware')
const { verifyPayload } = require('../controllers/JWT');
const { userAuth } = require('../middlewares/Auth');

router.post('/register',userMiddleware.register);
router.post('/login', userMiddleware.login);
router.post('/verify', verifyPayload, userAuth)
router.post('/uploadImage', userMiddleware.upload.single('image'), userMiddleware.afterUpdate)
router.post('/updateProfile', userMiddleware.changeProfile)

module.exports = router;
