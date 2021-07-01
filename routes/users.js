const { User, ValidateUsers } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();


// mongoose
//     .connect('mongodb://localhost/users', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch((err) => console.error('Could not connect to MongoDB...', err));

router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.post('/', async (req, res) => {
    const { error } = ValidateUsers(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    let user = new User({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        residence: req.body.residence
    });

    user = await user.save();
    res.send(user);
});

router.put('/:id', async (req, res) => {
    const { error } = ValidateUsers(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        {
            new: true
        }
    );

    if (!user) {
        res.status(404).send('cannot find the desired genre');
    }

    user.name = req.body.name;

    res.send(user);
});

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(
        req.params.id,
        { name: req.body.name },
        {
            new: true
        }
    );

    if (!user) {
        res.status(404), res.send('cannot find the desired genre');
    }

    res.send(user);
});
router.get('/:id', async (req, res) => {
    const user = await User.findById(
        req.params.id,
        { name: req.body.name },
        {
            new: true
        },
        console.log(user)
    );
    if (!user) {
        res.status(404).send('cannot find the desired genre');
    }
    res.send(user);
});

module.exports = router;
