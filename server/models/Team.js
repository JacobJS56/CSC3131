const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Team mongo db schema

const TeamSchema = new Schema({
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
    teamName: {
        type: String,
        uniqie: true,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
    },
    rateablePersonList:[{
        rateablePerson: {
            type: Schema.Types.ObjectId,
            ref: 'rateablePerson'
        }
    }],
    primaryColour: {
        type: String,
        uniqie: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("team", TeamSchema);