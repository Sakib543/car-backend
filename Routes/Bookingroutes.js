const express = require('express');
const router = express.Router();
const bookingController = require('../Controllers/Bookingcontroller');

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.put('/:id', bookingController.updateBookingStatus);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
