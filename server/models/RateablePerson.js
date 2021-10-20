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
    rating: {
        type: Number,
        required: true,
        validate: {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
    },
    numOfRatings: {
        type: Number,
        default: 0
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'team',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = RateablePerson = mongoose.model("rateablePerson", RateablePersonSchema);