const express = require('express');
const router = express.Router();
const { createAccount, loginUser, getAllUsers, getUserById } = require('../controllers/userController');
const auth = require('./../middlewares/authMiddleware');
// POST => /api/v1/createAccount
router.post('/createAccount', createAccount);
router.post('/login', loginUser)
router.get('/allUsers', auth, getAllUsers)
router.get('/user', auth, getUserById)

// update => /api/v1/updateUser
// router.put('/updateUser', updateUser);




module.exports = router     