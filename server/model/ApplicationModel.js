const mongoose = require('mongoose')
const Schema = mongoose.Schema

const People = require('../model/PeopleModel')
const Offer = require('../model/OfferModel')

const applicationSchema = new Schema({
    apply_date: {
        type: Date,
        default: Date.now
    },
    people: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People'
    },
    offer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected', "Under Review"],
        default: 'Pending'
    }
})

const Application = mongoose.model('Application', applicationSchema)

module.exports = Application