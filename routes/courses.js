const { Course, ValidateCourse } = require('../models/course');
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();

// mongoose
//     .connect('mongodb://localhost/courses', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch((err) => console.error('Could not connect to MongoDB...', err));

router.get('/', async (req, res) => {
    const courses = await Course.find().sort('cname');
    res.send(courses);
});

router.get('/:cid', async (req, res) => {
    const course = await Course.findById(
        req.params.id,
        { cname: req.body.name },
        {
            new: true
        }
    );
    if (!course) {
        res.status(404).send('cannot find the desired course');
    }
    res.send(course);
});
module.exports = router;
