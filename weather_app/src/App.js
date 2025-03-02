import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    fetchWeather();
  }, );

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setWeather(response.data);
    } catch (err) {
      setError("Failed to fetch weather data");
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>
      <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
          placeholder="Enter city"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <div className="p-4 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">{weather.name}</h2>
          <p className="text-lg">{weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
