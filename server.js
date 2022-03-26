'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT;
const apiWeather = require('./modules/weather');
const apiMovies = require('./modules/movies');


app.get('/', (request, response) => {
  response.send('Hello and Welcome to the home base');
});
app.get('/weather', apiWeather);
app.get('/movies', apiMovies);



app.listen(PORT, () => console.log(`listening on port ${PORT}`));
// Tels our express att where to find.

// use npx nodemon server.js to start server
