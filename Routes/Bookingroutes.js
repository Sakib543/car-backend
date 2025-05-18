const express = require('express');
const router = express.Router();
const bookingController = require('../Controllers/Bookingcontroller');
const BookingLog = require('../Models/BookingLog');

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.put('/:id', bookingController.updateBookingStatus);
router.delete('/:id', bookingController.deleteBooking);
router.get('/customer/search', bookingController.getBookingsByCustomer);
router.get('/:id/logs', async (req, res)  => {
    try {
      const logs = await BookingLog.find({ bookingId: req.params.id });
      res.json(logs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
module.exports = router;
