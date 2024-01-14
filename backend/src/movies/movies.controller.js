const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/*********Middleware Validaters*********/
async function validMovieId(req, res, next) {
  const { movieId } = req.params;
  const movie = await moviesService.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({
    status: 404,
    message: "Movie cannot be found.",
  });
}

/*********Query Controller functions*********/

//function to return single movie object
async function read(req, res, next) {
  try {
    const { movie } = res.locals;
    res.status(200).json({ data: movie });
  } catch {
    next();
  }
}

//list of movies playing in which theater
async function listTheaters(req, res, next) {
  try {
    const { movieId } = req.params;
    const result = await moviesService.listTheaters(movieId);
    res.status(200).json({ data: result });
  } catch {
    next();
  }
}

//list of reviews for each movie
async function listReviews(req, res, next) {
  try {
    const { movieId } = req.params;
    const reviewsByMovie = await moviesService.listMovieReviews(movieId);
    let reviews = [];
    for (let i = 0; i < reviewsByMovie.length; i++) {
      let review = reviewsByMovie[i];
      const critic = await moviesService.listCritics(review.critic_id);
      review.critic = critic[0];
      reviews.push(review);
    }
    res.status(200).json({ data: reviews });
  } catch {
    next();
  }
}

//full list of movies playing and shows whether they are showing or not
async function list(req, res, next) {
  try {
    const { is_showing } = req.query;
    console.log(is_showing);
    if (is_showing !== false) {
      res.json({ data: await moviesService.listShowingMovies() });
    } else {
      res.json({ data: await moviesService.list() });
    }
  } catch {
    next();
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(validMovieId), asyncErrorBoundary(read)],
  listTheaters: [
    asyncErrorBoundary(validMovieId),
    asyncErrorBoundary(listTheaters),
  ],
  listReviews: [
    asyncErrorBoundary(validMovieId),
    asyncErrorBoundary(listReviews),
  ],
};
