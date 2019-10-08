// IMPORT MODULES HERE
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//IMPORT Models
const User = require('../models/users');

//ROUTES

//<---------------------------- GET ---------------------------->
// routes /users
router.get('/', (req, res, next) => {
    User.find()
        .select("username password _id")
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({ result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
});
// routes /users/:userId
router.get('/:userId', (req, res, next) => {
    const _id = req.params.userId;
    User.findById(_id)
        .select("username password _id")
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


//<---------------------------- POST ---------------------------->
router.post('/', (req, res, next) => {

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name      : req.body.name,
        username  : req.body.username,
        password  : req.body.password
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
            if(err.code == 11000)
                return res.status(500).json({
                    success : false,
                    message : 'A username has already exists'
                });
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});
//<---------------------------- PATCH ---------------------------->
router.patch('/:userId', (req, res, next) => {
    const _id = req.params.userId;
    const updateOps = {}; // operation
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    User.update({ _id: _id }, { $set: updateOps })
        .exec()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({
            error : err
        }))
});

//<---------------------------- DELETE ---------------------------->
router.delete('/:userId', (req, res, next) => {
    //get _id from user
    const _id = req.params.userId
    User.remove({ _id: _id })
        .exec()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({
            error: err
        }));
})

module.exports = router;
