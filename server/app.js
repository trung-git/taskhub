const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');


const corsOptions = {
  origin: '*',
  credentials: true,
};
const limiter = rateLimit({
  max: 1000,
  windowMs: 5 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour !',
});

//Set up
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);
app.use(limiter);
app.use(compression());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());


//Router
const userRouter = require('./routes/userRoutes.js');
const taskTagRouter = require('./routes/taskTagRoutes.js');
const areaRouter = require('./routes/areaRoutes.js');
const postRouter = require('./routes/postRoutes.js');
const chatRouter = require('./routes/chatRoutes.js');
const contractRouter = require('./routes/contractRoutes.js');
const reviewRouter = require('./routes/reviewRoutes.js');
const walletRouter = require('./routes/walletRoutes.js');

// Utils
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError.js');

app.get('/', (req, res) => {
  res.status(200).json({ data: 'App is running....' });
});
app.use('/api/v1/user', userRouter);
app.use('/api/v1/task-tag', taskTagRouter);
app.use('/api/v1/area', areaRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/contract', contractRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/wallet', walletRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Not found ${req.originalUrl}`, 404));
});
//Error handling
app.use(globalErrorHandler);

module.exports = app;
