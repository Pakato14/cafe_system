const express = require('express')
const user = require('./userRoutes')
const category = require('./categoryRoutes')
const product = require('./productRoutes')


module.exports = app => {
    app.use(express.json(),
        express.urlencoded({ extended: false }),
        user,
        category,
        product

        )
}