import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const apiKey = 'YOUR_API_KEY';

  const getWeather = async () => {
    setErrorMessage('');
    setWeatherData(null);
    if (!city) {
      setErrorMessage('Please enter a city name.');
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        throw new Error(data.message);
      }

      setWeatherData({
        temp: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
    } catch (error) {
      setErrorMessage('City not found or there was an error fetching the data.');
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather Dashboard</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={getWeather}>Get Weather</button>
      {errorMessage && <div id="error-message">{errorMessage}</div>}
      {weatherData && (
        <div id="weather-info">
          <h2>{city}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
            alt={weatherData.description}
          />
          <p>Temperature: {weatherData.temp}°C</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>{weatherData.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
