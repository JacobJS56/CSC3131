const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameweekSchema = new Schema({
    gameweek: {
        type: Number,
        required: true,
        validate: {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
    },
    teamMap: {
        type: Map,
        of: Schema.Types.ObjectId,
        ref: 'team',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Gameweek = mongoose.model("gameweek", GameweekSchema);