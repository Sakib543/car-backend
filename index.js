const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();
const app = express();


//mongodb connection
mongoose.connect(process.env.MONGO_URI, {
//  useNewUrlParser: true,
//   useUnifiedTopology: true,
  serverSelectionTimeoutMS: 3000, // Timeout after 3s instead of 10s
  retryWrites: true,
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
app.use('/api/bookings', require('./Routes/Bookingroutes'));
app.use('/api/user', require('./Routes/userroutes'));
app.use('/api/user-login', require('./Routes/loginroute'));
app.use('/api/user-EPChange' , require('./Routes/ChangeEPRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
})