const express = require('express');
const Store = require('../models/StoreModel.js');

// creating a new store
exports.createStore = async (req, res) => {

    const user = req.user;

    const store = new Store(req.body);
    //who created the store
    store.user = user;
    const savedStore = await store.save();
    res.status(201).json({
        success: true,
        savedStore
    })
}

//get all stores
exports.getStores = async (req, res) => {

    const store = await Store.find();
    if (!store) {
        return res.status(404).json({ message: 'Store not found' })
    }
    res.status(200).json(store);
}

//get a store by Own
exports.getStoreByOwn = async (req, res) => {

    // Populate the store
    req.user = await req.user.populate('store', '_id');

    const storeId = req.user.store.at(0)._id
    const store = await Store.findById(storeId)

    if (!store) {
        return res.status(404).json({ message: "Store not found" })
    }

    res.status(200).json({
        status: "OK",
        store: store
    })
}

// Get a Store By Id
exports.getStoreById = async (req, res) => {
    const _id = req.params._id
    try {
        const store = await Store.findById(_id);

        if (!store) {
            throw new Error();
        }

        res.status(200).send(store)

    } catch (err) {
        res.status(404).send({
            message: "Store not found",
            error: err.message
        })
    }
}