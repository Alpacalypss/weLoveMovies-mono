const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function getMoviesByTheater(req, res, next) {
  try {
    res.status(200).json({ data: await theatersService.listMoviesInTheater() });
  } catch {
    next();
  }
}

module.exports = {
  getMoviesByTheater: asyncErrorBoundary(getMoviesByTheater),
};
