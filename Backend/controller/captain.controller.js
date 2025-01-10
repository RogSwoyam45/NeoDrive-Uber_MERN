const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');




module.exports.registerCaptain = async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        res.status(400).json({error: error.array()});
    }

    const {fullname , email , password , vehicle} = req.body;
    const isCaptainExist = await captainModel.findOne({email});

    if(isCaptainExist){
        return res.status(400).json({error: 'Captain already exist'});
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname : fullname.lastname,
        email,
        password : hashedPassword,
        color : vehicle.color,
        plate : vehicle.plate,
        capacity : vehicle.capacity,
        VehicleType: vehicle.VehicleType
    });

    const token = await captain.getAuthToken();

    res.status(201).json({ token , captain});
}