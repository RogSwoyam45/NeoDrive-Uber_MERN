const mongoose = require('mongoose');
require('dotenv').config();

const blacklistTokenSchema = new mongoose.Schema({
    token: { 
        type: String,
        required: true,
        unique: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: process.env.JWT_EXPIRES_IN }
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);