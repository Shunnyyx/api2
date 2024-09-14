const express = require('express');
const router = express.Router();
const axios = require('axios');

// API Key de OpenWeatherMap desde las variables de entorno
const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

// Endpoint para obtener el clima
router.get('/weather', async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Se requiere el parámetro "location"' });
  }

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: location,
        appid: API_KEY,
        units: 'metric' // Utiliza 'imperial' para Fahrenheit
      }
    });

    const data = response.data;

    const weatherInfo = {
      location: data.name,
      temperature: `${data.main.temp}°C`,
      description: data.weather[0].description,
      humidity: `${data.main.humidity}%`,
      wind_speed: `${data.wind.speed} m/s`
    };

    res.json(weatherInfo);
  } catch (error) {
    console.error('Error al obtener el clima:', error);
    res.status(500).json({ error: 'Error al obtener el clima' });
  }
});

module.exports = router;
