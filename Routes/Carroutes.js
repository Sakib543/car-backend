const express = require('express');
const router = express.Router();
const carController = require('../Controllers/Carcontroller');
const upload = require('../utils/cloudinary'); // middleware

router.post('/', upload.single('carImage'), carController.createCar);
router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);
router.put('/:id', upload.single('carImage'), carController.updateCar);
router.delete('/:id', carController.deleteCar);

module.exports = router;
