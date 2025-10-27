//index.js
// index.js
const express = require('express');
const app = express();
const usersRouter = require('./routes/users');

// Global middleware
app.use(express.json()); // parse JSON bodies

// Mount routers
app.use('/users', usersRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
