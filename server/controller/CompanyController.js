let Company = require('../model/CompanyModel')

// create and save company

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can't be empty !" })
        return
    }

    // new company 

    const company = new Company({
        name: req.body.name,
        description: req.body.description,
        number_employees: req.body.number_employees,
        city: req.body.city,
        email: req.body.email,
        website: req.body.website,
        owners: req.body.owners
    })

    // save the company in the db

    company.save().then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while doing a create operation"
        })
    })
}


// find and return all companies

exports.find = (req, res) => {
    Company.find()
    .populate('owners')
    .then(company => {
        res.send(company)
    }).catch(err => {
        res.status(500).send({ message: err.message || "Error occured while finding all companies" })
    })
}

// find and return only one company

exports.findOne = (req, res) => {
    const id = req.params.id

    Company.findById(id)
    .populate('owners')
    .then(data => {
        if (!data) {
            res.status(400).send({ message: `We can't find the company with id ${id}. Maybe it doesn't exist` })
        } else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({ message: err.message || "Error when finding company information" })
    })
}

// Update a company thanks its id 

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can't be empty" })
    }

    const id = req.params.id

    Company.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({ message: `We can't update company with ID : ${id}. Maybe it doesn't exist` })
        } else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({ message: "Error when updating company informations" })
    })
}

// Delete a company thanks id 

exports.delete = (req, res) => {
    const id = req.params.id

    Company.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(404).send({ message: `We can't delete company with ID : ${id}. Maybe it doesn't exist` })
        } else {
            res.send({ message: "Company has been delete successfully" })
        }
    }).catch(err => {
        res.status(500).send({ message: `Error when deleting company with id : ${id}` })
    })
}