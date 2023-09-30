const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


module.exports = app;