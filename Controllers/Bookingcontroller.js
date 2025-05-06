const Booking = require('../Models/Bookingmodel');
const Car = require('../Models/Carmodel');
const mongoose = require('mongoose');
const BookingLog = require('../Models/BookingLog');
mongoose.set('strictPopulate', false);


exports.createBooking = async (req, res) => {
  try {
    const { carId, customerName, customerPhone, startDate, endDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({ error: 'Invalid carId' });
    }

    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ error: 'Car not found' });

    const days =
      (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24);
    const totalPrice = Math.ceil(days) * car.pricePerDay;

    const booking = new Booking({
      carId,
      customerName,
      customerPhone,
      startDate,
      endDate,
      totalPrice,
    });

    await booking.save();

// After creating booking
await new BookingLog({
  bookingId: booking._id,
  action: 'Created',
  status: booking.status
}).save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('carId');
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    await new BookingLog({
      bookingId: booking._id,
      action: 'Status Updated',
      status
    }).save();
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getBookingsByCustomer = async (req, res) => {
  try {
    const { phone } = req.query;

    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    const bookings = await Booking.find({ customerPhone: phone }).populate('carId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

