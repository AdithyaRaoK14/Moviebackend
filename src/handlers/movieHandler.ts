import prisma from "../db";

export const getMovie = async (req, res, next) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: req.body.id,
      },
    });
    if (!movie) {
      createMovie(req, res, next);
    } else res.status(200).json(movie);
  } catch (err) {
    err.type = "input";
    next(err);
  }
};

export const createMovie = async (req, res, next) => {
  try {
    const movie = await prisma.movie.create({
      data: {
        title: req.body.title,
        description: req.body.overview,
        year: req.body.release_date,
        imdbRating: req.body.vote_average,
        poster: req.body.poster_path,
        background: req.body.backdrop_path,
        id: req.body.id,
      },
    });
    res.status(200).json(movie);
  } catch (err) {
    err.type = "input";
    next(err);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    err.type = "input";
    next(err);
  }
};
