'use strict';

// Most of this file was sourced from Hexx during lab
require('dotenv').config();
const express = require('express');
// Kinda like import react from react;
const cors = require('cors');
//This protects the body on the internet from bad request.
const app = express();
// calling the express library so we can use it to "get" end points.
const axios = require('axios');
// Bringing in Axios
app.use(cors());
// defining middleware kinda known as software glue and error handling
const PORT = process.env.PORT;
//This must be named because when using databases to deploy they look for the PORT variable.

app.get('/', (request, response) => {
  response.send('Hello and Welcome to the home base');
});

app.get('/weather', apiWeather);
async function apiWeather(request, response) {
  const lat = parseInt(request.query.lat);
  const lon = parseInt(request.query.lon);
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=3&`;
  try {
    const weatherResponse = await axios.get(url);
    const weatherArr = weatherResponse.data.data.map(data => new Forecast(data));
    response.status(200).send(weatherArr);
  } catch (error) {
    console.error(`error from axios: ${error}`);
    response.status(500).send('server error!!!');
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
app.get('/movies', apiMovies);
async function apiMovies(request, response) {
  const searchQuery = request.query.searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEIQ_KEY}&query=${searchQuery}`;
  try{
    const movieResponse = await axios.get(url);
    const movieArr = movieResponse.data.results.map(data => new Movie (data));
    response.send(movieArr);
  }catch(error){
    response.status(500).send('server error!!!');
  }
}
class Movie {
  constructor(obj){
    this.title = obj.title;
    this.release_date = obj.release_date;
    this.img = `https://image.tmdb.org/t/p/w500${obj.backdrop_path}`;
  }
}


app.listen(PORT, () => console.log(`listening on port ${PORT}`));
// Tels our express att where to find.

// use npx nodemon server.js to start server
