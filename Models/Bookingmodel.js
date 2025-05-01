const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    carId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    customerName:{type:String,required:true},
    customerPhone: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Confirmed', 'Cancelled'] },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Booking', bookingSchema);