const bcrypt = require('bcrypt');
const User = require('../models/user');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const secretKey = 'anythingForNow';
const pimgsDir = path.join(__dirname, '..', 'uploads/users/pimgs');
const express = require('express');
const router = express.Router();
const Post = require('../models/post');

module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('http://localhost:3000/');
    }
    return res.render('user_sign_in');
};


module.exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const postCount = await Post.countDocuments({ user: user.id });
           return res.render('profile', { profile_user: user, postCount: postCount});
    } catch (err) {
        req.flash('error', 'User not found');
        return res.redirect('/');
    }
};

module.exports.settings = async (req, res) => {
    return res.render('settings');
}


module.exports.update = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            throw new Error('Unauthorized!');
        }

        const user = await User.findById(req.params.id);

        User.uploadedAvatar(req, res, async (err) => {
            if (err) {
                console.error(err);
                req.flash('error', 'An error occurred during file upload.');
                return res.redirect('back');
            }
            user.name = req.body.name;
            user.email = req.body.email;
            user.bio = req.body.bio;

            if (req.file) {
                if (user.avatar) {
                    try {
                        await fs.promises.unlink(path.join(__dirname, '..', user.avatar));
                    } catch (err) {
                        console.error('Error deleting previous avatar:', err);
                    }
                }
                user.avatar = User.avatarPath + '/' + req.file.filename;
            }

            try {
                await user.save();
                req.flash('success', 'Profile updated successfully.');
                return res.redirect('back');
            } catch (err) {
                console.error('Error saving user:', err);
                req.flash('error', 'An error occurred during user save.');
                return res.redirect('back');
            }
        });
    } catch (err) {
        req.flash('error', err.message || 'An error occurred during update.');
        return res.redirect('back');
    }
};


module.exports.create = async (req, res) => {
    const data = {
        email: req.body.email,
        phone: req.body.phone,
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
    };
    const { password, confirm_password } = req.body;
  
    // Check if passwords match
    if (password !== confirm_password) {
        req.flash('error', 'Passwords not confirm.');
        return res.redirect('back');
    }


    // Check if email exists
    let existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
        req.flash('error', 'Email already exists.');
        return res.redirect('back');
    }
  
    // Check if phone exists
    existingUser = await User.findOne({ phone: data.phone });
    if (existingUser) {
        req.flash('error', 'Phone number already exists.');
        return res.redirect('back');
    }
  
    // Check if username exists
    existingUser = await User.findOne({ username: data.username });
    if (existingUser) {
        req.flash('error', 'Username already exists.');
        return res.redirect('back');
    }
    
    // If none of the fields exist, proceed with user creation
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;
  
        await User.create(data);
        req.flash('success', 'Account created successfully.');
        return res.redirect('/users/sign-in');
    } catch (error) {
        console.error('Error creating user:', error);
        req.flash('error', 'An error occurred while creating the account.');
        return res.redirect('back');
    }
};



//sign in and create session for user
module.exports.createSession = (req,res)=>{
    //sesssion is created by passport all we need to do is redirect to the home page
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log('Error in destroying session:', err);
            return;
        }
        req.flash('success', 'You have logged out successfully!');
        return res.redirect('/');
    });
};