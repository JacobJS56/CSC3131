const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeasonSchema = new Schema({
    season: {
        type: Number,
        required: true,
        validate: {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
    },
    gameweekMap: {
        type: Map,
        of: Schema.Types.ObjectId,
        ref: 'gameweek',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Season = mongoose.model("season", SeasonSchema);