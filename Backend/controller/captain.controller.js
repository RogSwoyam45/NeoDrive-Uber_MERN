const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenSchema = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;
  const isCaptainExist = await captainModel.findOne({ email });

  if (isCaptainExist) {
    return res.status(400).json({ error: 'Captain already exists' });
  }

  if (!fullname || !fullname.firstname || !fullname.lastname || !email || !password || !vehicle || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.VehicleType) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      VehicleType: vehicle.VehicleType
    });

    const token = captain.getAuthToken();
    res.cookie('token', token);
    return res.status(201).json({ token, captain });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select('+password');

  if (!captain) {
    return res.status(400).json({ msg: 'Invalid email or password' });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(400).json({ msg: 'Invalid email or password' });
  }

  const token = captain.getAuthToken();

  res.cookie('token', token);

  return res.status(200).json({ token, captain });
};

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.header.authorization?.split(' ')[1];

  await blacklistTokenSchema.create({ token });
  res.clearCookie('token');

  return res.status(200).json({ message: 'Logout Successful' });
};