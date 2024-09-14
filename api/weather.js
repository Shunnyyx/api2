const axios = require('axios');
const path = require('path');

// Asegúrate de tener tu clave API configurada en las variables de entorno
const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

module.exports = async (req, res) => {
  try {
    // Obtén la ubicación desde los parámetros de la consulta
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({ error: 'Parámetro de ubicación es requerido' });
    }

    // Solicita datos del clima a la API de OpenWeatherMap
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: location,
        appid: API_KEY,
        units: 'metric' // Usa 'imperial' para Fahrenheit
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
        alert: "",
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
      forecast: [] // Agrega datos de pronóstico si es necesario
    };

    // Responde con los datos del clima
    res.json(weatherData);

  } catch (error) {
    console.error('Error al obtener los datos del clima:', error);
    res.status(500).json({ error: 'Error al obtener los datos del clima' });
  }
};
