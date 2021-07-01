const Joi = require('joi');
const mongoose = require('mongoose');
const users = require('./routes/users');
const courses = require('./routes/courses');
const express = require('express');
const app = express();


mongoose
    .connect('mongodb+srv://sachinmotwani02:13sachin02@cluster0.p9cxr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/courses', courses);

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`listening on port ${port}...`));
