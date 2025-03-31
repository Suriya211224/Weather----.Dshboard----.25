const API_KEY = "9D88D0D585DAC5A86114854942E3E344";

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found!");
        
        const data = await response.json();
        const weatherHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Weather: ${data.weather[0].description}</p>
            <img class="icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
        `;

        document.getElementById("weatherResult").innerHTML = weatherHTML;
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = "<p style='color:red;'>City not found!</p>";
    }
}
