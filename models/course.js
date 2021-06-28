const mongoose = require('mongoose');
const Joi = require('joi');

const Course = mongoose.model(
    'Course',
    new mongoose.Schema({
        cid: { type: Number, required: true },
        cname: { type: String, required: true, minlength: 5, maxlength: 50 },
        author: { type: String, required: true, minlength: 5, maxlength: 50 },
        description: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,
            unique: true
        },
        price: {
            type: Number,
            required: true,
            unique: true,
            minlength: 10,
            maxlength: 11
        },
        videos: [
            {
                vid: {
                    type: Number,
                    required: true,
                    minlength: 5,
                    maxlength: 255
                },
                vtitle: {
                    type: String,
                    required: true,
                    minlength: 5,
                    maxlength: 255
                },
                vsubtitle: {
                    type: String,
                    required: true,
                    minlength: 5,
                    maxlength: 999999
                },
                vdescription: {
                    type: String,
                    required: true,
                    minlength: 5,
                    maxlength: 999999
                }
            }
        ],
        cdate: {
            type: Date,
            default: Date.now
        }
    })
);

function ValidateCourses(course) {
    const schema = Joi.object({
        cid: Joi.number().required(),
        cname: Joi.string().min(5).max(50).required(),
        author: Joi.string().min(5).max(50).required(),
        price: Joi.string().required().min(5).max(100000)
        // videos = Joi.array().items(video),
        // video = Joi.object().keys({
        //     vid: Joi.number().required(),
        //     vtitle:Joi.string().min(5).max(255).required(),
        //     vsubtitle:Joi.string().min(5).max(999999).required(),
        //     vdescription:Joi.string().min(5).max(999999).required()
        // })
    });
    return schema.validate(course);
}

exports.Course = Course;
exports.ValidateCourses = ValidateCourses;
