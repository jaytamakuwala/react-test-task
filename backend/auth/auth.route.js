const route = require('express').Router();

const authController = require('./auth.controller');

route.post('/signup', authController.signUp);
route.post('/signin', authController.signIn);

module.exports = route;
