const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeasonSchema = new Schema({
    seasonNumber: {
        type: Number,
        required: true,
        validate: {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
    },
    gameweekList:
    [{
        gameweek: {
            type: Schema.Types.ObjectId,
            ref: 'gameweek'
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Season = mongoose.model("season", SeasonSchema);