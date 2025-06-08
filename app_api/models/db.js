const mongoose = require('mongoose');
const readLine = require('readline');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

// Connection
const connect = () => {
  setTimeout(() => mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }), 1000);
};

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Windows shutdown
if (process.platform === 'win32') {
  const r1 = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  r1.on('SIGINT', () => {
    process.emit("SIGINT");
  });
}

// Shutdown function
const gracefulShutdown = msg => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
  });
};

// Nodemon restart
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});

// App termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination');
  process.exit(0);
});

// Container shutdown
process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown');
  process.exit(0);
});

connect();
require('./travlr'); // Load the schema
module.exports = mongoose;