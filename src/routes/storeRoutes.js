const express = require('express');
const router = express.Router();
const { createStore, getStores, getStoreByOwn, getStoreById } = require('./../controllers/storeController');
const auth = require('./../middlewares/authMiddleware');
router.route('/store')
    .post(auth, createStore)
    .get(auth, getStores)

router.get('/store/:_id', getStoreById)
router.get('/store/me', auth, getStoreByOwn)








module.exports = router