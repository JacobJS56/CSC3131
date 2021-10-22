const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameweekSchema = new Schema({
    season: {
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
    teamList:
    [{
        team: {
            type: Schema.Types.ObjectId,
            ref: 'team'
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Gameweek = mongoose.model("gameweek", GameweekSchema);