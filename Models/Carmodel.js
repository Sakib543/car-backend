const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: {
        type: String,
        enum: ['Hatchback', 'Sedan', 'SUV', 'Mini Van'],
        required: true
    },
    modelYear: { type: Number, required: true },
    numPlate: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    seats: { type: Number, required: true },
    fuelType: { type: String, required: true },
    transmission: { type: String, required: true },
    carImage: { type: String },
    available: { type: Boolean, default: true },
}, { timestamps: true });


module.exports = mongoose.model('Car', carSchema);
