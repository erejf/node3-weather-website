const request = require("postman-request")

//get data from user
const geolocation = (city, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(city) + ".json?access_token=pk.eyJ1IjoiZXZ6ZW5lciIsImEiOiJjbDh0MTM1cDMwMmM2M3VwNzE4emp6Z3czIn0.FOSHOc1NbBSg_xURRbF4Xw&limit=1"

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback("Unable to connect service with error.", undefined)
        } else if (body.features.length === 0) {
            callback("GeoLocation: Unable to find location.", undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].text
            })
        }
    })
}

module.exports = geolocation
