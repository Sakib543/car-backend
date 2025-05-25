const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmpassword: { type: String },
    isVerified: { type: Boolean, default: false }, // also fixed typo "isVeerified" → "isVerified"
    isActive: { type: Boolean, default: true }
}, {
    timestamps: { createdAt: 'Created_at', updatedAt: 'Updated_at' }
});

module.exports = mongoose.model('UserInfo', userSchema);
