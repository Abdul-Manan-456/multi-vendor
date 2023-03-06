const jwt = require('jsonwebtoken');
const express = require('express');
const User = require('./../models/UserModel');

const auth = async (req, res, next) => {



    try {

        const token = req.header('Authorization').replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOne({ _id: decode._id })


        if (!user) {
            throw new Error();
        }

        req.user = user
        req.token = token
    } catch (err) {
        res.status(401).send({
            message: err.message,
            message: 'Please Authenticate'
        })
    }
    next();
}

module.exports = auth;

