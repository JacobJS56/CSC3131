const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect database
connectDB();

app.use( express.json({ extended: false }));

// Define Routes
app.use('/api/rateable_person', require('./controller/api/rateablePerson'));
app.use('/api/team', require('./controller/api/team'));
app.use('/api/gameweek', require('./controller/api/gameweek'));
app.use('/api/season', require('./controller/api/season'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ' + PORT));