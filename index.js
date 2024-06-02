try {
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    const data = await res.json()
    document.body.style.backgroundImage = `url(${data.urls.regular})`
    document.getElementById("author").textContent = `By: ${data.user.name}`
} catch (err) {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
    document.getElementById("author").textContent = `By: Author name.`
}

// With the try block, I'm able to use the "res" variable twice, since it's block scoped. Remember to set type=module in html.

try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    if (!res.ok) {
        throw Error("Something went wrong")
    }
    const data = await res.json()
    document.getElementById("crypto-top").innerHTML = `
        <img src=${data.image.small} />
        <span>${data.name}</span>
    `
    document.getElementById("crypto").innerHTML += `
    /**    <p>🎯: $${data.market_data.current_price.usd}</p>
    /**    <p>👆: $${data.market_data.high_24h.usd}</p>
    /**    <p>👇: $${data.market_data.low_24h.usd}</p>
`
} catch (error) {
    console.log(err)
}


function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" })
}

setInterval(getCurrentTime, 1000)

if ("geolocation" in navigator) {
    console.log("The (navigator.geolocation) object exists, Geolocation services available. ")
} else {
    console.log("The object doesn't exists, geolocation services not available.")
}

// The method takes in 2 callback functions (success, error) as parameter, with optional 3rd parameter.
navigator.geolocation.getCurrentPosition(success, error)

// You need to make it an async function for top level usage of "await" keyword.
async function success(position) {
    const coordinates = position.coords;
    const latitude = coordinates.latitude
    const longitude = coordinates.longitude
    console.log("Your coordinates are: " + coordinates)
    console.log("Latitude: " + latitude)
    console.log("Longitude: " + longitude)
    console.log(`More or Less: ${coordinates.accuracy} metres.`)

    console.log("----------------------------------------")
    console.log("API info: ")

    try {
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        if (!res.ok) {
            throw Error("Weather data not available")
        }
        const data = await res.json()
        console.log(data)
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        console.log(iconUrl)
        document.getElementById("weather").innerHTML = `
            <img src=${iconUrl}>
            <p class="weather-temp">${Math.round(data.main.temp)}º</p>
            <p class="weather-city">${data.name}</p>
        `
    } catch (err) {
        console.error(err)
    }
}

function error(err) {
    console.log("An error occurred: " + err)
}