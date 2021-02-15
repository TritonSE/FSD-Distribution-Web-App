const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./models');
require('dotenv').config();

// Database
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true)
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017');
mongoose.connection.once('open', async () => {
    console.log('Established connection to MongoDB.');
});

const app = express();

// Middleware
app.use(morgan('combined'));
app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication
require('./middleware/passport')();
app.use(passport.initialize());

// Routes
app.use('/agency', require('./routes/agency'));
app.use('/login', require('./routes/login'));

// Catch-all route
app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'build/index.html'), (err) => {
        if (err) {
            next();
        }
    });
});

// Error handling
app.use((req, res, next) => {
    next(createError(404));
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({message: err.message});
});

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('Express server started on port %s', port);
});

module.exports = app