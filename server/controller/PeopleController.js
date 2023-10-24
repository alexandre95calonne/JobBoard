const jwt = require('jsonwebtoken')
require('dotenv').config()

let People = require('../model/PeopleModel')
const bcrypt = require('bcryptjs')
const saltRounds = 10

// create and save people

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can't be empty !" })
        return
    }

    bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send({ message: "Error hashing password" })
        }

        // new people 

        const people = new People({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword
        })

        // save the people in the db

        people.save().then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while doing a create operation"
            })
        })
    })
}


// find and return all people

exports.find = (req, res) => {
    People.find().then(people => {
        res.send(people)
    }).catch(err => {
        res.status(500).send({ message: err.message || "Error occured while finding all people" })
    })
}

// find and return only one people

exports.findOne = (req, res) => {
    const id = req.params.id

    People.findById(id).then(data => {
        if (!data) {
            res.status(400).send({ message: `We can't find the people with id ${id}. Maybe it doesn't exist` })
        } else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({ message: err.message || "Error when finding people information" })
    })
}

// Update a people thanks its id 

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can't be empty" })
    }

    const id = req.params.id

    People.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({ message: `We can't update people with ID : ${id}. Maybe it doesn't exist` })
        } else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({ message: "Error when updating people informations" })
    })
}

// Delete a people thanks id 

exports.delete = (req, res) => {
    const id = req.params.id

    People.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(404).send({ message: `We can't delete people with ID : ${id}. Maybe it doesn't exist` })
        } else {
            res.status(200).send({ message: "People has been delete successfully" })
        }
    }).catch(err => {
        res.status(500).send({ message: `Error when deleting people with id : ${id}` })
    })
}

// login 

exports.login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: "Email and password are required" })
    }

    People.findOne({ email: req.body.email })
        .select('+password')
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found" })
            }

            // compare pwd with hashed pwd

            console.log("req.body.password:", req.body.password);
            console.log("user.password from DB:", user.password);


            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    console.error(err)
                    return res.status(500).send({ message: "Error with password comparison" })
                }

                if (!result) {
                    return res.status(401).send({ message: "Invalid password" })
                }

                // if password correct we generate JWT token 
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

                return res.send({ 
                    token: token,
                    user: {
                        id: user._id,
                        status: user.status
                    }
                 })
            })
        })
        .catch(err => {
            return res.status(500).send({ message: "Error during login" })
        })
}

exports.checkEmail = async (req, res) => {
    const email = req.query.email
    const user = await People.findOne({ email: email})
    if(user) {
        res.json({exists: true})
    } else {
        res.json({exists: false})
    }
}