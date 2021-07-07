const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRouter = require('./auth/auth.route');

const app = express();
const url = 'mongodb://localhost:27017/testtask';
const PORT = 4000;

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}, () => {
    console.log('Database connected.')
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log('Server connected to port ' + PORT + '.');
})

module.exports = app;