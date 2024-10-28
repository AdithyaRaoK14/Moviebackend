import prisma from "../db";

export const getRating = async (req, res, next) => {
  try {
    const query = await prisma.rating.aggregate({
      _sum: {
        userRating: true,
      },
      _count: {
        userId: true,
      },
      where: {
        movieId: +req.params.movieId,
      },
    });
    let sum = (query._sum.userRating / query._count.userId).toFixed(1);
    res.status(200).json({ data: sum });
  } catch (err) {
    err.type = "input";
    next(err);
  }
};

export const createRating = async (req, res, next) => {
  try {
    const findExistingRating = await prisma.rating.findUnique({
      where: {
        userId_movieId: {
          userId: req.user.id,
          movieId: +req.params.movieId,
        },
      },
    });
    if (findExistingRating) {
      req.id = findExistingRating.id;
      return updateRating(req, res, next);
    } else {
      const rating = await prisma.rating.create({
        data: {
          movieId: +req.params.movieId,
          userId: req.user.id,
          userRating: req.body.userRating,
        },
      });
      res.status(200).json({ data: rating });
    }
  } catch (err) {
    err.type = "input";
    next(err);
  }
};

export const updateRating = async (req, res, next) => {
  try {
    const rating = await prisma.rating.update({
      where: {
        userId_movieId: {
          userId: req.user.id,
          movieId: +req.params.movieId,
        },
      },
      data: {
        userRating: req.body.userRating,
      },
    });
    res.status(200).json({ data: rating });
  } catch (err) {
    err.type = "input";
    next(err);
  }
};
