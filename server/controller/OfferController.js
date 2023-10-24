let Offer = require('../model/OfferModel')

// create and save offer

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can't be empty !" })
        return
    }

    // new offer 

    const offer = new Offer({
        title: req.body.title,
        description: req.body.description,
        contract_type: req.body.contract_type,
        sector: req.body.sector,
        duration_value: req.body.duration_value,
        duration_unit: req.body.duration_unit,
        city: req.body.city,
        company: req.body.company,
        applications: req.body.applications,
        wage: req.body.wage
    })

    // save the offer in the db

    offer.save().then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while doing a create operation"
        })
    })
}


// find and return all offers

exports.find = (req, res) => {
    Offer.find()
    .populate('company')
    .populate('applications')
    .then(offer => {
        res.send(offer)
    }).catch(err => {
        res.status(500).send({ message: err.message || "Error occured while finding all offers" })
    })
}

// find and return only one offer

exports.findOne = (req, res) => {
    const id = req.params.id

    Offer.findById(id)
    .populate('company')
    .populate('applications')
    .then(data => {
        if (!data) {
            res.status(400).send({ message: `We can't find the offer with id ${id}. Maybe it doesn't exist` })
        } else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({ message: err.message || "Error when finding offer information" })
    })
}

// Update a offer thanks its id 

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can't be empty" })
    }

    const id = req.params.id

    Offer.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({ message: `We can't update offer with ID : ${id}. Maybe it doesn't exist` })
        } else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({ message: "Error when updating offer informations" })
    })
}

// Delete a offer thanks id 

exports.delete = (req, res) => {
    const id = req.params.id

    Offer.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(404).send({ message: `We can't delete offer with ID : ${id}. Maybe it doesn't exist` })
        } else {
            res.send({ message: "offer has been delete successfully" })
        }
    }).catch(err => {
        res.status(500).send({ message: `Error when deleting offer with id : ${id}` })
    })
}