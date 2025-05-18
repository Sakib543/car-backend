const mongoose = require('mongoose');
mongoose.set('strictPopulate', false);

const bookingSchema = new mongoose.Schema({
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    cnic:{type: String, required: true},
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { 
        type: String, 
        default: 'Pending', 
        enum: ['Pending', 'Confirmed', 'Cancelled'] 
    },
    overtimeRate: {
        type: String,
        default: '350/hr'
    },
    tripType: {
        type: String,
        enum: ['inCity', 'outCity'],
        default: 'inCity'
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);