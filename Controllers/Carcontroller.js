const Car = require('../Models/Carmodel');

// Create Car
exports.createCar = async (req, res) => {
    try {
        const car = new Car(req.body);
        if (req.file && req.file.path) {
            car.carImage = req.file.path; // cloudinary URL
        }
        await car.save();
        res.status(201).json(car);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get All Cars
exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Car by ID
exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ error: 'Car not found' });
        res.json(car);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Car
exports.updateCar = async (req, res) => {
    try {
        const updatedData = req.body;
        if (req.file && req.file.path) {
            updatedData.carImage = req.file.path;
        }

        const car = await Car.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!car) return res.status(404).json({ error: 'Car not found' });

        res.json(car);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Car
exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) return res.status(404).json({ error: 'Car not found' });
        res.json({ message: 'Car deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
