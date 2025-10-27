const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const productRoutes = require('./productroutes');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(logger);

// public route
app.get('/', (req, res) => res.send('Hello World'));

// protected routes
app.use('/api/products', auth, productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

