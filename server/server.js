const dotenv = require('dotenv');
const http = require('http');
const app = require('./app.js');
const connectDB = require('./config/db.js');
const createSocketServer = require('./config/socket.io.js');
const server = http.createServer(app);

dotenv.config();

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

//Variables ENV
const PORT = process.env.PORT || 3000;

//MongoDB connection
connectDB();
createSocketServer(server);

server.listen(PORT, () => {
  console.log(`App is running in: http://localhost:${PORT}/`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('🤟 SIGTERM RECEIVED. Shutting down gracefully');
  console.log('🔥 Process terminated!');
});
