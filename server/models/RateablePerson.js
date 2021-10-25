const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RateablePersonSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    ratingList: [{
        type: Number,
    }],
    rating: {
        type: Number,
    },
    numOfRatings: {
        type: Number,
        validate: {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    teamName: {
        type: String,
        required: true
    },
    teamId: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = RateablePerson = mongoose.model("rateablePerson", RateablePersonSchema);