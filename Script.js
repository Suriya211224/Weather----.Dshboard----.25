const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeather API key

async function getWeather() {
    const city = document.getElementById('city-input').value;
    const errorMessage = document.getElementById('error-message');
    const weatherInfo = document.getElementById('weather-info');
    errorMessage.innerHTML = '';
    weatherInfo.innerHTML = '';

    if (!city) {
        errorMessage.innerHTML = 'Please enter a city name.';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const weatherDescription = data.weather[0].description;
        const icon = data.weather[0].icon;

        weatherInfo.innerHTML = `
            <h2>${city}</h2>
            <p><img src="https://openweathermap.org/img/wn/${icon}.png" alt="${weatherDescription}" /></p>
            <p>Temperature: ${temp}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>${weatherDescription}</p>
        `;
    } catch (error) {
        errorMessage.innerHTML = 'City not found or there was an error fetching the data.';
    }
}
