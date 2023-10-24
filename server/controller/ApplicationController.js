let Application = require('../model/ApplicationModel')

// create and save application

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can't be empty !" })
        return
    }

    // new application 

    const application = new application({
        people: req.body.people,
        offer: req.body.people,
        status: req.body.status
    })

    // save the application in the db

    application.save().then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while doing a create operation"
        })
    })
}


// find and return all applications

exports.find = (req, res) => {
    Application.find()
    .populate('company')
    .populate('applications')
    .then(application => {
        res.send(application)
    }).catch(err => {
        res.status(500).send({ message: err.message || "Error occured while finding all applications" })
    })
}

// find and return only one application

exports.findOne = (req, res) => {
    const id = req.params.id

    Application.findById(id)
    .populate('company')
    .populate('applications')
    .then(data => {
        if (!data) {
            res.status(400).send({ message: `We can't find the application with id ${id}. Maybe it doesn't exist` })
        } else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({ message: err.message || "Error when finding application information" })
    })
}

// Update a application thanks its id 

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can't be empty" })
    }

    const id = req.params.id

    Application.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({ message: `We can't update application with ID : ${id}. Maybe it doesn't exist` })
        } else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({ message: "Error when updating application informations" })
    })
}

// Delete a application thanks id 

exports.delete = (req, res) => {
    const id = req.params.id

    Application.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(404).send({ message: `We can't delete application with ID : ${id}. Maybe it doesn't exist` })
        } else {
            res.send({ message: "Application has been delete successfully" })
        }
    }).catch(err => {
        res.status(500).send({ message: `Error when deleting application with id : ${id}` })
    })
}