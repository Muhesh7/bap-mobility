'use strict'
const mobility = require('express').Router()
const controller = require('../controllers/')

mobility.post('/search', controller.search)
mobility.post('/on_search', controller.onSearch)

mobility.post('/select', controller.select)
mobility.post('/on_select', controller.onSelect)

module.exports = mobility