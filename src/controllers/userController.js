const express = require('express');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');


exports.createAccount = async (req, res) => {
    try {
        const { email, password, ...options } = req.body;

        //check for user
        const isUserFound = await User.findOne({ email })

        if (isUserFound) {
            return res.status(302).json({
                message: "user already exists"
            })
        }

        //save the user details
        const user = new User(req.body)
        const userSaved = await user.save();
        res.status(201).json({
            status: 'success',
            userSaved
        })
    } catch (error) {
        res.send(error);
    }
}

// update user
exports.updateUser = async (req, res) => {
    const { email, password } = req.body;

    //check if user already exists
    const isUserFound = await User.findOne({ email });

    if (!isUserFound || await !isUserFound.passwordCompare(password)) {
        return res.status(403).json({
            message: 'invalid credentials',
        });
    }
}

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;


    //finding the user
    const user = await User.findOne({ email });
    try {

        if (user && (await user.passwordCompare(password)) === true) {
            //assgning the token
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            user.tokens = [...user.tokens, token];
            user.save();
            return res.status(200).json({
                data: user,
                token
            })
        } else {
            throw new Error('Invalid credentials')
        }
    } catch (error) {
        res.status(403).json({
            success: false,
            message: error.message,
        })
    }
}

// Get All Users
exports.getAllUsers = async (req, res) => {
    const users = await User.find()
    res.status(200).json({
        data: users
    })
}

// Get user by Id
exports.getUserById = async (req, res) => {

    // id from user auth middleware
    const _id = req.user._id;

    const user = await (await User.findById(_id))

    // if user is not found
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }

    res.status(200).json({
        success: true,
        user
    })
}