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
const Chat = require('../models/chatModel');


module.exports.chatLoad = async (req, res) => {
    var users = await User.find({ _id: { $nin: [req.session.user]} });
    return res.render('chat', { ajay: req.session.user, users : users});
}



module.exports.saveChat = async(req, res) =>{
    try {
        var chat = new Chat({
            sender_id : req.body.sender_id,
            receiver_id : req.body.receiver_id,
            message : req.body.message,
        });  
        console.log(sender_id);

        var newChat= await chat.save();
        res.status(200).send({ success: true, msg: 'chat inserted', data: newChat});
        
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message});
    }
}