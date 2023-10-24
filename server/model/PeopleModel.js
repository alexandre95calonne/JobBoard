const mongoose = require('mongoose')
const Schema = mongoose.Schema


const peopleSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['employer', 'candidate', 'admin'],
        default: 'candidate'
    },
    password: {
        type: String,
        required: true,
        select: false
    }
})

const People = mongoose.model('People', peopleSchema)

module.exports = People