const express = require('express');
const { verifyAdmin } = require('../controllers/JWT');
const { login, adminHome, blockUser, deleteUser, makeAdmin } = require('../middlewares/adminMiddleware');
const { adminAuth } = require('../middlewares/Auth');
const router = express.Router();
const {register} = require('../middlewares/userMiddleware')

router.post('/login', login)
router.post('/verify', verifyAdmin, adminAuth)
router.get('/home', adminHome)
router.post('/blockUser', blockUser)
router.post('/deleteUser',deleteUser)
router.post('/makeAdmin',makeAdmin)
// router.post('/adminSignup',adminSignup)

module.exports = router;