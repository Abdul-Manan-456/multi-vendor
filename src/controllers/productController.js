const mongoose = require('mongoose')
const Product = require('./../models/ProductModel');
const User = require('./../models/UserModel');

// create a new Product
exports.createProduct = async (req, res) => {

    let product = new Product(req.body);

    // passing req.user to create product
    product.user = req.user

    await product.save();
    res.status(201).json({
        success: true,
        product
    })
}

// get all products
// Public 
exports.getAllProducts = async (req, res) => {
    const product = await Product.find()

    res.status(200).json({
        documents: product.length,
        product
    })
}

// get a product by id
// public
exports.getProductById = async (req, res) => {
    const product = (await Product.findById(req.params.id)).populate('user', 'fname lname')
    if (!product) {
        return res.status(404).send('Product not found')
    }
    res.status(200).json({
        success: true,
        product
    })
}

// delete a product
exports.deleteProduct = async (req, res) => {
    try {

        req.user = await req.user.populate('products');
        const products = req.user.products

        for (let product of products) {

            if (product.id === req.params.id) {
                await Product.findByIdAndDelete(req.params.id)
            } else {
                res.status(401)
                throw new Error('You do not have permission to delete this product');
            }
        }

        res.status(200).send("product deleted");

    } catch (err) {
        res.status(404).send(err.message);
    }
}


// update a product
exports.updateProduct = async (req, res) => {

    const paramsId = req.params.id

    req.user = await req.user.populate('products')
    const products = req.user.products

    try {

        for (const product of products) {
            if (product.id === req.params.id) {
                const product = await Product.findByIdAndUpdate(paramsId, req.body, { new: true })
                product.save();
                res.status(201).json(product);
            } else {
                throw new Error('You are not allowed to update this product')
            }
        }
    } catch (err) {
        res.status(404).send(err.message);
    }

}