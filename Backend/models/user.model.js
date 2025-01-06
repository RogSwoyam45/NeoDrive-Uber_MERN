const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname : {
            type : String,
            required : true,
            minlength : [3, 'First name must be atleast 3 characters long'],
        },

        lastname : {
            type : String,
            minlength : [3, 'Last name must be atleast 3 characters long'],
        }
    },

    email : {
        type : String,
        required : true,
        unique : true,
        minlength : [11, 'email must be atleast 11 characters long'],
    },

    password : {
        type : String,
        required : true,
        select : false,
    },

    socketId : {
        type : String,
    }
})


userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET); 
    return token;
}

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('UberUser', userSchema);

module.exports = userModel;