const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

//Set up
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

//Router
const userRouter = require('./routes/userRoutes.js');

app.get('/', (req, res) => {
  res.status(200).json({ data: 'App is running....' });
});
app.use('/api/v1/user', userRouter);

module.exports = app;
