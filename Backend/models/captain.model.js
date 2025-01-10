const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const captainSchema = mongoose.Schema({
    fullname: {
        firstname:{
            type: String,
            minlength: [    3, 'Firstname must be at least 3 characters long'],
            required: true
        },
        lastname:{
            type:String,
            minlength:[3, 'Lastname must be at least 3 characters long'],
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match : [/\S+@\S+\.\S+/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    socketID:{
        type: String
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long']
        },
        plate:{
            type: String,
            required: true,
            minlength: [3, 'Plate must be at least 3 characters long']
        },
        capacity:{
            type: Number,
            required: true,
            minlength: [1, 'atleast 1']
        },
        VehicleType:{
            type: String,
            enum: ['car', 'motorcycle', 'auto'],
            required: true
        }
        
    },
    location:{
        lat:{
            type: Number,
        },
        long:{
            type: Number,
        }
    }
})


captainSchema.methods.getAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
    return token;
}

captainSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}


const captainModel = mongoose.model('Captain', captainSchema);


module.exports = captainModel;