const express = require('express');
const router = express.Router();
const BookingLog = require('../Models/BookingLog');

// Get logs by bookingId
router.get('/:bookingId', async (req, res) => {
  try {
    const logs = await BookingLog.find({ bookingId: req.params.bookingId }).sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Optional: Manual log creation
router.post('/', async (req, res) => {
  try {
    const { bookingId, action, status } = req.body;
    const log = await new BookingLog({ bookingId, action, status }).save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
