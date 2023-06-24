const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors')

const corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//Set up
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(cors(corsOptions));

//Router
const userRouter = require('./routes/userRoutes.js');

// Utils
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError.js');

app.get('/', (req, res) => {
  res.status(200).json({ data: 'App is running....' });
});
app.use('/api/v1/user', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Not found ${req.originalUrl}`, 404));
});
//Error handling
app.use(globalErrorHandler);
  
module.exports = app;
