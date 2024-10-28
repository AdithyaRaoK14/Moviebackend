import prisma from "../db";

export const getWatchList = async (req, res, next) => {
  try {
    const watchlist = await prisma.watchList.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        movie: true,
      },
    });
    res.status(200).json({ data: watchlist });
  } catch (err) {
    err.type = "input";
    next(err);
  }
};
export const deleteWatchList = async (req, res, next) => {
  try {
    const watchlist = await prisma.watchList.delete({
      where: {
        userId_movieId: {
          userId: req.user.id,
          movieId: +req.params.movieId,
        },
      },
    });
    res.status(200).json({ data: watchlist });
  } catch (err) {
    err.type = "input";
    next(err);
  }
};
export const createWatchList = async (req, res, next) => {
  try {
    const watchlist = await prisma.watchList.create({
      data: {
        movieId: +req.params.movieId,
        userId: req.user.id,
      },
    });
    res.status(200).json({ data: watchlist });
  } catch (err) {
    err.type = "input";
    next(err);
  }
};
export const isMovieWatched = async (req, res, next) => {
  try {
    const watchlist = await prisma.watchList.findUnique({
      where: {
        userId_movieId: {
          userId: req.user.id,
          movieId: +req.params.movieId,
        },
      },
    });
    if (watchlist) {
      res.status(200).json({ data: true });
    } else {
      res.status(200).json({ data: false });
    }
  } catch (err) {
    err.type = "input";
    next(err);
  }
};
