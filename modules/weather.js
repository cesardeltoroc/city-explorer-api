'use strict';
const axios = require('axios');
const cache = require('./cache.js');


function getWeather(lat, lon) {
  const weatherKey = 'weather-' + parseInt(lat) + parseInt(lon);
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=7&`;

  if (cache[weatherKey] && (Date.now() - cache[weatherKey].timestamp < 500000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[weatherKey] = {};
    cache[weatherKey].timestamp = Date.now();
    cache[weatherKey].data = axios.get(url)
      .then(response => parseWeather(response.data));
  }

  return cache[weatherKey].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(obj => {
      return new Forecast(obj);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Forecast {
  constructor(obj) {
    this.date = obj.valid_date,
    this.highTemp = obj.max_temp,
    this.lowTemp = obj.low_temp,
    this.description = obj.weather.description;
  }
}

module.exports = getWeather;
