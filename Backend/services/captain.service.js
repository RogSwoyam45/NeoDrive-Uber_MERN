const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    firstname , lastname , email , password , color , plate , capacity , VehicleType
}) => {
    if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !VehicleType) {
        throw new Error('All fields are required');
      }

    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            VehicleType
        }
    })

    return captain;
}