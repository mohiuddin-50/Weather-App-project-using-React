import React, { useState } from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiDayCloudy } from 'react-icons/wi';

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = '35b0bcbda6d36f50351f1ddbb9c35ef9';

  const fetchWeather = () => {
    if (!city) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeatherData(data);
          setError('');
        } else {
          setError('City not found');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching weather data');
        setLoading(false);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Clear':
        return <WiDaySunny size={80} color="gold" />;
      case 'Clouds':
        return <WiCloudy size={80} color="lightgray" />;
      case 'Rain':
        return <WiRain size={80} color="blue" />;
      case 'Snow':
        return <WiSnow size={80} color="lightblue" />;
      case 'Thunderstorm':
        return <WiThunderstorm size={80} color="darkgray" />;
      case 'Fog':
      case 'Mist':
        return <WiFog size={80} color="lightgray" />;
      case 'Drizzle':
        return <WiDayCloudy size={80} color="gray" />;
      default:
        return <WiDaySunny size={80} color="gold" />;
    }
  };

  return (
    <div className="weather-bg">
      <div className="weather-box">
        <div className="header">
          <h1>Check Weather</h1>
        </div>

        <div className="search-box">
          <br />
          <input
            type="text"
            placeholder="Enter your city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={`search-button ${loading ? 'loading' : ''}`}
            type="submit"
            onClick={fetchWeather}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {weatherData && (
          <div className="weather-body">
            <h2>
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>

            <div className="weather-icon">
              {getWeatherIcon(weatherData.weather[0].main)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
