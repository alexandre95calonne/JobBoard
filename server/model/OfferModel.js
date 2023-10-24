const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Company = require('../model/CompanyModel')
const Application = require('../model/ApplicationModel')

const offerSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    contract_type: {
        type: String,
        enum: ['Internship', 'Work Study', 'Permanent', 'Temporary', 'Freelance'],
        required: true
    },
    sector: {
        type: String,
        enum: ['Finance', 'Business', 'Consulting', "Customer Service", "Design", "Fashion", "Health", "Hospitality", "Industry", "Marketing", "Media", "Retail", "Tech", "Tourism"],
        required: true,
    },
    wage:{
        type: Number
    },
    duration_value: {
        type: Number
    },
    duration_unit: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    publish_date: {
        type: Date,
        default: Date.now,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }]
})

const Offer = mongoose.model('Offer', offerSchema)

Offer.createOffer = function(offerData, callback) {
    if(!offerData.publish_date) {
        offerData.publish_date = new Date()
    }

    const expirationDate = new Date(offerData.publish_date)
    expirationDate.setMonth(expirationDate.getMonth() + 3)
    offerData.expiration_date = expirationDate

    const newOffer = new Offer(offerData)
    newOffer.save(callback)
}

module.exports = Offer