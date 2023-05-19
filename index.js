const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cors = require('cors');

//Local Imports
const connectDB = require('./config/db');
const eventRouter = require('./routes/eventRoutes');
const testimonialRouter = require('./routes/testimonialRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

//Connect to DB
connectDB();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get('/', (req, res) => res.send('API Working'));

//Specific app routes
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/testimonials", testimonialRouter);

//Listener
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`.red)});
