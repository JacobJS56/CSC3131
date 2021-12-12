const express = require('express');
const connectDB = require('./config/db');
const fs = require('fs')
const https = require('https')
const morgan = require('morgan');
const { constants } = require('http2');
const app = express();

// Connect database
connectDB();
app.use(express.json())
var accessLogStream = fs.createWriteStream('./logs' + '/log.log', {flags: 'a'})
app.use(morgan('combined',  {"stream": accessLogStream}));
app.use( function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Define Routes
app.use('/api/admin', require('./controller/api/admin'));
app.use('/api/rateable_person', require('./controller/api/rateablePerson'));
app.use('/api/team', require('./controller/api/team'));
app.use('/api/gameweek', require('./controller/api/gameweek'));
app.use('/api/season', require('./controller/api/season'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ' + PORT));

module.exports = {
    app
}