const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProductById, deleteProduct, updateProduct } = require('./../controllers/productController');
const auth = require('./../middlewares/authMiddleware');


router.post('/product', auth, createProduct)
router.get('/product/all', getAllProducts)
router.get('/product/:id', getProductById)
router.delete('/product/:id', auth, deleteProduct)
router.put('/product/:id', auth, updateProduct)


module.exports = router