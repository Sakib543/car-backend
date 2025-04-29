const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();


//mongodb connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/cars', require('./Routes/Carroutes'));
app.use

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {
    console.log('Server is running on port',PORT);
})
