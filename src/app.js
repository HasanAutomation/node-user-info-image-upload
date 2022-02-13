const express = require('express');
const path = require('path');
const connectDB = require('./db/connectDB');
const globalErrorHandler = require('./middleware/globalErrorHandler');
const AppError = require('./util/AppError');
const app = express();

// connect database
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
console.log('path==', path.join(__dirname, '../uploads'));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Node API' });
});

// Mount routes
app.use('/api/v1/users', require('./routes/user'));
app.use('/api/v1/uploads', require('./routes/upload'));

app.all('*', (req, res, next) => next(new AppError('Not Found', 404)));
app.use(globalErrorHandler);
module.exports = app;
