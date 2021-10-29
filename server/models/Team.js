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
        default: 0,
    },
    rateablePersonList:[{
        rateablePerson: {
            type: Schema.Types.ObjectId,
            ref: 'rateablePerson'
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Team = mongoose.model("team", TeamSchema);