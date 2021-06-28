const Joi = require('joi');
const mongoose = require('mongoose');
const users = require('./routes/users');
const express = require('express');
const app = express();

mongoose
    .connect('mongodb://localhost/users', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/users', users);

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`listening on port ${port}...`));
