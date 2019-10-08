// IMPORT MODULES HERE
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//IMPORT Models
const User = require('../models/users');

//ROUTES

// GET // 
// routes /users
router.get('/', (req, res, next) => {
    User.find()
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({result});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error : err});
        })
});
// routes /users/:userId
router.get('/:userId', (req, res, next) => {
    const _id = req.params.userId;
    User.findById(_id)
        .exec()
        .then(result => {
            console.log(result);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "No valid entry found for provided ID" })
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
})


// POST //
router.post('/', (req, res, next) => {

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password
    });

    user.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "User Created",
                user: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});


module.exports = router;
