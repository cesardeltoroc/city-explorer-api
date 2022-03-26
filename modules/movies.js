'use strict';
const axios = require('axios');

function apiMovies(request, response) {
  const searchQuery = request.query.searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEIQ_KEY}&query=${searchQuery}`;

  axios
    .get(url)
    .then(res => {
      const movieArr = res.data.results.map(data => new Movie (data));
      response.send(movieArr);
    })
    .catch(err => {
      console.error(`error from axios: ${err}`);
      response.status(500).send('server error!!!');
    });
}

class Movie {
  constructor(obj){
    this.title = obj.title;
    this.release_date = obj.release_date;
    this.img = `https://image.tmdb.org/t/p/w500${obj.backdrop_path}`;
  }
}

module.exports = apiMovies;
