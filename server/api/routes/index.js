const express = require('express')


module.exports = app => {
    app.use(express.json(),
        express.urlencoded({ extended: false }),
        
        )
}