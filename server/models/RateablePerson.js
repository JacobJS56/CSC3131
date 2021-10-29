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
        default: 0
    },
    numOfRatings: {
        type: Number,
        validate: {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        },
        default: 0
    },
    teamName: {
        type: String,
        required: true
    },
    teamId: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = RateablePerson = mongoose.model("rateablePerson", RateablePersonSchema);