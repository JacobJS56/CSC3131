const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    teamName: {
        type: String,
        uniqie: true,
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
    rateablePersonMap: {
        type: Map,
        of: Schema.Types.ObjectId,
        ref: 'rateablePerson',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Team = mongoose.model("team", TeamSchema);