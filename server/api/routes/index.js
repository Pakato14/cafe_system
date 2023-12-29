const express = require('express')
const user = require('./userRoutes')
const category = require('./categoryRoutes')
const product = require('./productRoutes')
const bill = require('./billRoutes')
const dashboard = require('./dashboardRoutes')


module.exports = app => {
    app.use(express.json(),
        express.urlencoded({ extended: false }),
        user,
        category,
        product, 
        bill,
        dashboard

        )
}