'use strict';
const axios = require('axios');
const cache = require('./cache.js');


function getMovies(searchQuery) {
  const movieKey = 'weather-' + searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEIQ_KEY}&query=${searchQuery}`;

  if (cache[movieKey] && (Date.now() - cache[movieKey].timestamp < 500000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[movieKey] = {};
    cache[movieKey].timestamp = Date.now();
    cache[movieKey].data = axios.get(url)
      .then(response => parseMovie(response.data));
  }

  return cache[movieKey].data;
}

function parseMovie(movieData) {
  try {
    const movieSummaries = movieData.results.map(obj => {
      return new Movies(obj);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Movies {
  constructor(obj) {
    this.title = obj.title;
    this.release_date = obj.release_date;
    this.img = `http://image.tmdb.org/t/p/w500${obj.backdrop_path}`;
  }
}

module.exports = getMovies;
