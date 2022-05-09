
const weatherRoutes = (app, fs) => {

    const dataPath = './data/weatherdata.json';

    const saveWeatherData = (data) => {
        const stringifyData = JSON.stringify(data)
        fs.writeFileSync(dataPath, stringifyData)
    }

    const getWeatherData = () => {
        const jsonData = fs.readFileSync(dataPath, 'utf8')
        return JSON.parse(jsonData)
    }

    const getWeatherDataByUnit = (unit) => {
        const jsonData = fs.readFileSync(dataPath, 'utf8')
        let parseddata = JSON.parse(jsonData)
        if (unit === 'f') { //CtoF default is deg C
            parseddata.map(data => {
                if (data.temp) {
                    data.temp = parseInt((data.temp * 1.8) + 32)
                }
            })
        }
        return parseddata
    }

    const validWeatherData = (parsedata) => {
        let newdata = []
        try {
            parsedata.map(data => {
                if (data.temp && data.lat && data.lng) {
                    newdata.push(data)
                }
            });
        } catch (error) {
            throw new Error("Invalid Json")
        }
        return newdata
    }

    /**
     * /addWeather:
     *    post:
     *      description: post u weather reacord.
     *      parameters:
     *          - name: weather object
     *            description: weather object json
     */

    app.post('/addWeather', (req, res) => {
        try {
            var existData = getWeatherData()
            existData = fs.readFileSync(req.files.File.path)
            let parsedata = JSON.parse(existData)
            let filteredData = validWeatherData(parsedata)
            saveWeatherData(filteredData);
            res.send({ success: true, msg: 'Weather data added successfully!' })
        } catch (error) {
            console.log(error)
            let msg = 'Weather data upload failed.'
            if (error instanceof SyntaxError) {
                msg = msg + 'Invalid Json.'
            }
            if (error instanceof Error) {
                msg = 'Invalid weather data Json.'
            }
            res.send({ success: false, msg: msg })
        }
    })

    /**
     * /weather:
     *    get:
     *      description: Fetch all weather record
     *      produces:
     *          - application/json
     *      responses:
     *            200:
     *              description: An array of all results
     */
    app.get('/weather', (req, res) => {
        try {
            const weathers = getWeatherData()
            res.send(weathers)
        } catch (error) {
            console.log(error)
            res.send({ success: false, msg: "Error" })
        }
    })

    /**
    * /weather:unit:
    *    get:
    *      description: Fetch all weather record and convert unit to C or F
    *      produces:
    *          - application/json
    *      responses:
    *            200:
    *              description: An array of all results
    **/

    app.get('/weather/:unit', (req, res) => {
        const unit = req.params.unit || 'c'; //default is deg C
        try {
            const weathers = getWeatherDataByUnit(unit)
            res.send(weathers)
        } catch (error) {
            console.log(error)
            res.send({ success: false, msg: "Error" })
        }
    })
};

module.exports = weatherRoutes