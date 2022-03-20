'use strict';

// Most of this file was sourced from Hexx during lab

require('dotenv').config();
const express = require('express');
// Kinda like import react from react;

const cors = require('cors');
//This protects the body on the internet from bad request.

const app = express();
// calling the express library so we can use it to "get" end points.

const weatherData = require('./data/weather.json');
// const { parse } = require('dotenv');
// console.log(weatherData);

app.use(cors());
// defining middleware kinda known as software glue and error handling

const PORT = process.env.PORT;
//This must be named because when using databases to deploy they look for the PORT variable.

app.get('/', (request, response) => {
  response.send('You ARE WORKING YAYYYY!!!!');
});



app.get('/weather', (req, res) => {
  const type = req.query.type;
  console.log(type);

  let lat = type[0];
  let lon = type[1];
  const weather = weatherData.filter((value) => {
    return parseInt(value.lat) === parseInt(lat) && parseInt(value.lon) === parseInt(lon);
  });
  console.log(weather[0].data);
  res.send(weather[0]);
});



app.listen(PORT, () => console.log(`listening on port ${PORT}`));
// Tels our express att where to find.
