const knex = require("../db/connection");

const listShowingMovies = () => {
  return knex("movies as m")
    .distinct()
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true });
};

const listTheaters = (movieId) => {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.movie_id", "mt.is_showing")
    .where({ "mt.movie_id": movieId });
};

const listCritics = (criticId) => {
  return knex("critics").select("*").where({ critic_id: criticId });
};

const listMovieReviews = (movieId) => {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*")
    .where({ "r.movie_id": movieId });
};

const read = (movie_id) => {
  return knex("movies").select("*").where({ movie_id }).first();
};

const list = () => knex("movies").select("*");

module.exports = {
  listShowingMovies,
  listTheaters,
  listCritics,
  listMovieReviews,
  list,
  read,
};
