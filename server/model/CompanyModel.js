const mongoose = require('mongoose')
const Schema = mongoose.Schema

const People = require('./PeopleModel')

const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    number_employees: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    owners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People'
    }],
    status: {
        type: String,
        enum: ["Not confirmed", "Confirmed"],
        default: "Not confirmed"
    }
})

const Company = mongoose.model('Company', companySchema)

module.exports = Company