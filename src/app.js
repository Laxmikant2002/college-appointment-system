const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const swaggerConfig = require('./config/swagger');
const rateLimiter = require('./middlewares/rateLimiter');

connectDB();
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/availability', availabilityRoutes);

// Swagger API documentation
swaggerConfig(app);

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;