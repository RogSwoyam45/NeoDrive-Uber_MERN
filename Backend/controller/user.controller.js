const userModel = require('../models/user.model');  
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const blacklistTokenSchema = require('../models/blacklistToken.model');

module.exports.registerUser = async (req,res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()});
    }

    const { fullname : {firstname, lastname}, email, password} = req.body;

    const hashedPassword = await userModel.hashPassword(password);


    const user = await userService.createUser({
        firstname,
        lastname, 
        email,
        password : hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token , user});

}


module.exports.loginUser = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()});
    }

    const {email , password} = req.body;

    const user = await userModel.findOne({email}).select("+password");
    
    if(!user){
        return res.status(401).json({errors : [{msg : 'Invalid Credentials'}]});
    }



    const isMatch = await user.comparePassword(password);



    if(!isMatch){
        return res.status(401).json({errors : [{msg : 'Invalid Credentials'}]});
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({token , user});
}


module.exports.getProfile = async (req,res) => {

    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req,res) => {
    
    
    res.clearCookie('token');
    const token = req.cookies.token || req.header.authorization?.split(' ')[1];

    await blacklistTokenSchema.create({token});

    res.status(200).json({msg : "Logged out successfully"});
}