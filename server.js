'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT;
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');

app.get('/', (request, response) => {
  response.send('Hello and Welcome to the home base');
});
app.get('/weather', weatherHandler);
app.get('/movies', movieHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  getWeather(lat, lon)
    .then(weatherSummaries => response.send(weatherSummaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}
function movieHandler(request, response) {
  const searchQuery = request.query.searchQuery;
  getMovies(searchQuery)
    .then(movieSummaries => response.send(movieSummaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
