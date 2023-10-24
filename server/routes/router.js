const express = require('express')
const route = express.Router()
const PeopleController = require('../controller/PeopleController')
const CompanyController = require('../controller/CompanyController')
const OfferController = require('../controller/OfferController')
const ApplicationController = require('../controller/ApplicationController')

// API 

// People

route.post('/api/login', PeopleController.login)
route.post('/api/person', PeopleController.create)
route.get('/api/persons', PeopleController.find)
route.get('/api/person/:id', PeopleController.findOne)
route.get('/api/check-email', PeopleController.checkEmail)
route.put('/api/person/:id', PeopleController.update)
route.delete('/api/person/:id', PeopleController.delete)

// Company

route.post('/api/company', CompanyController.create)
route.get('/api/companies', CompanyController.find)
route.get('/api/company/:id', CompanyController.findOne)
route.put('/api/company/:id', CompanyController.update)
route.delete('/api/company/:id', CompanyController.delete)

// Offer

route.post('/api/offer', OfferController.create)
route.get('/api/offers', OfferController.find)
route.get('/api/offer/:id', OfferController.findOne)
route.put('/api/offer/:id', OfferController.update)
route.delete('/api/offer/:id', OfferController.delete)

// Application

route.post('/api/application', ApplicationController.create)
route.get('/api/applications', ApplicationController.find)
route.get('/api/application/:id', ApplicationController.findOne)
route.put('/api/application/:id', ApplicationController.update)
route.delete('/api/application/:id', ApplicationController.delete)

module.exports = route