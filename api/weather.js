const express = require('express');
const axios = require('axios');
const router = express.Router();

// Reemplaza 'YOUR_API_KEY' con tu clave de API de OpenWeatherMap
const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

// Ruta para obtener el clima
router.get('/', async (req, res) => {
  try {
    // Obtener la ubicación de los parámetros de consulta
    const { location } = req.query;

    if (!location) {
      return res.status(400).send('Parámetro de ubicación es requerido');
    }

    // Solicitud a la API de OpenWeatherMap
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: location, // Usar la ubicación proporcionada por el usuario
        appid: API_KEY,
        units: 'metric' // Usar 'imperial' para Fahrenheit
      }
    });

    const data = response.data;

    // Formato de respuesta
    const weatherData = {
      location: {
        name: data.name,
        lat: data.coord.lat,
        long: data.coord.lon,
        timezone: data.timezone,
        alert: "", // Puede ser usado para alertas meteorológicas
        degreetype: "C",
        imagerelativeurl: "http://openweathermap.org/img/wn/"
      },
      current: {
        temperature: data.main.temp.toFixed(0),
        skycode: data.weather[0].icon,
        skytext: data.weather[0].description,
        date: new Date().toISOString().split('T')[0],
        observationtime: new Date().toISOString().split('T')[1].split('.')[0],
        observationpoint: data.name,
        feelslike: data.main.feels_like.toFixed(0),
        humidity: data.main.humidity,
        winddisplay: `${data.wind.speed} m/s ${data.wind.deg > 180 ? 'South' : 'North'}`,
        day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
        shortday: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
        windspeed: `${data.wind.speed} m/s`,
        imageUrl: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      },
      forecast: [] // Aquí se podrían agregar datos de pronóstico si es necesario
    };

    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos del clima');
  }
});

module.exports = router;
