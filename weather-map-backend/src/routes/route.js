const express = require("express")
const router = express.Router();
const weatherRoutes = require('./weather.js')

const appRouter = (app, fs) => {
    // default route
    app.get('/', (req, res) => {
        res.send('welcome to the weather map api-server');
    });

    // // other routes
    weatherRoutes(app, fs);

};
module.exports = appRouter;



