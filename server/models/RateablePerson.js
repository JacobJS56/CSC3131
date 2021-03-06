const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// RateablePerson mongo db schema

const RateablePersonSchema = new Schema({
    seasonNumber: {
        type: Number,
        required: true,
        validate: {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
    },
    gameweekNumber: {
        type: Number,
        required: true,
        validate: {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
    },
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

module.exports = mongoose.model("rateablePerson", RateablePersonSchema);