const path = require("path")
const express = require("express")
const app = express()
const hbs = require("hbs")
const geoLocation = require("./utils/geolocation.js")
const forecast = require("./utils/forecast.js")
const port = process.env.PORT || 3000

//define paths for express config
const publicDir = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//setup handlebars and view engine
app.set("view engine", "hbs")
app.set("views", viewPath)
hbs.registerPartials(partialsPath)

//setup static director to serve
app.use(express.static(publicDir))


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather APP",
        name: "Evzen"
    })
})

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather APP",
        name: "Evzen"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Evzen"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Evzen"
    })
})

app.get("/weatherapi", (req, res) => {
    let address = req.query.address
    if (!address) {
        return res.send(
            {
                title: "Weather",
                name: "Evzen",
                error: "Search string was not taken. Type your city."
            })
    }
    geoLocation(address, (error, geoData) => {
        if (error) {
            return res.send(
                {
                    title: "Weather",
                    name: "Evzen",
                    error: "Search string is wrong. Type your city."
                })
        }
        forecast(geoData, (error, {location, description, currentTemperature, feelslikeTemperature, humidity} = {}) => {
            if (error) {
                return res.send(
                    {
                        title: "Weather",
                        name: "Evzen",
                        error: "Search string is wrong. Type your city."
                    })
            }
            return res.send(
                {
                    title: "Weather",
                    name: "Evzen",
                    location: location,
                    description: description,
                    currentTemperature: currentTemperature,
                    feelslikeTemperature: feelslikeTemperature,
                    humidity: humidity
                })
        })
    })
})

app.get("/help/*", (req, res) => {
    res.render("404",
        {
            title: "404",
            name: "Evzen Rejfir",
            error: "The specific article not found.",
        })
})

//must be at the end of get functions
app.get("*", (req, res) => {
    res.render("404",
        {
            title: "404",
            name: "Evzen Rejfir",
            error: "Page not found.",
        })
})

app.listen(port, () => {
        console.log("server is listening on port " + port)
    }
)