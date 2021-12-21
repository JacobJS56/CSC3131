const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Admin mongo db schema

const AdminSchema = new Schema({
    email: {
        type: String,
        required: true,
        maxLength: 200
    },
    password: {
        type: String,
        required: true, 
        maxLength: 200},
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("admin", AdminSchema);