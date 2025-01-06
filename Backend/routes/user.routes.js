const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controller/user.controller');

router.post('/register', [
    body('fullname.firstname').isLength({min : 3}).withMessage('First name must be atleast 3 characters long'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:3}).withMessage('Password must be minimum 3 characters')
],
    userController.registerUser

);


module.exports = router; 