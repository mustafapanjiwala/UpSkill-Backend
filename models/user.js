const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        id: { type: Number, required: true },
        name: { type: String, required: true, minlength: 5, maxlength: 50 },
        email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,
            unique: true
        },
        number: {
            type: Number,
            required: true,
            unique: true
            // minlength: 10,
            // maxlength: 11
        },
        residence: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255
        },
        date: {
            type: Date,
            default: Date.now
        }
    })
);

function ValidateUsers(user) {
    const schema = Joi.object({
        id: Joi.number().required(),
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        number: Joi.string().required().min(5).max(9999999999),
        residence: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.ValidateUsers = ValidateUsers;
