const responseForecast = document.querySelector("#responseForecast")
const form = document.querySelector("form")
const searchText = document.querySelector("input")

form.addEventListener("submit", (e) => {
    //stop refreshing the page after submiting form
    e.preventDefault()

    responseForecast.textContent = "Loading..."

    const city = searchText.value
    fetch("/weatherapi?address=" + city).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                responseForecast.textContent = data.error
            } else {
                let output = "In my location: " + data.location + " is actually " + data.currentTemperature + " °C and feels like " + data.feelslikeTemperature + " °C. Huminidity is " + data.humidity
                responseForecast.textContent = output
            }
        })
    })
})








