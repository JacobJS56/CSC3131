const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect database
connectDB();

// Init middleware
app.use( express.json({ extended: false }));

app.get('/', (req, res) => res.send('API UP'))

// Define Routes
app.use('/api/gameweek', require('./controller/api/gameweek'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ' + PORT));