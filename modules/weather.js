'use strict';
const axios = require('axios');

function apiWeather(request, response) {
  const lat = parseInt(request.query.lat);
  const lon = parseInt(request.query.lon);
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=3&`;

  axios
    .get(url)
    .then(weatherRes => {
      const weatherArr = weatherRes.data.data.map(data => new Forecast(data));
      response.status(200).send(weatherArr);
    }, url)
    .catch(err => {
      console.error(`error from axios: ${err}`);
      response.status(500).send('server error!!!');
    });
}
class Forecast {
  constructor(obj) {
    this.date = obj.valid_date,
    this.highTemp = obj.max_temp,
    this.lowTemp = obj.low_temp,
    this.description = obj.weather.description;
  }
}

module.exports = apiWeather;
