const mongoose = require('mongoose');

const bookingLogSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  action: { type: String, required: true }, // e.g., Created, Updated, Cancelled
  status: { type: String }, // Status at the time of action
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BookingLog', bookingLogSchema);