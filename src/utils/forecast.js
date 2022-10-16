const request = require("postman-request")

//get data from geolocation
const forecast = ( { latitude, longtitude, location, body }, callback) => {
    let url = "http://api.weatherstack.com/current?access_key=4f2d9eb12cf7386bf7914dfd3efecfe4&query=" + latitude + "," + longtitude

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect service with error.", undefined)
        } else if (body.error) {
            callback("Forecast: Unable to find location. Error - Type: " + body.error.type + " info: " + body.error.info, undefined)
        } else {
            callback(undefined,
                {
                        location: location,
                        description: body.current.weather_descriptions[0],
                        currentTemperature: body.current.temperature,
                        feelslikeTemperature: body.current.feelslike
                })
        }
    })
}

module.exports = forecast