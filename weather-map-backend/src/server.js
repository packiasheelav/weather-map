const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors');
const formidable = require('express-formidable');
const fs = require('fs');

// create our express app
const app = express()
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(formidable());
// route
const routes = require('./routes/route.js')(app, fs);

const server = app.listen(3001, () => {
    console.log('listening on port %s...', server.address().port);
});