import { Router } from "express";
import { body } from "express-validator";
import { getMovie } from "./handlers/movieHandler";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "./handlers/commentHandler";
import {
  createRating,
  getRating,
  updateRating,
} from "./handlers/ratingHandler";
import {
  createWatchList,
  deleteWatchList,
  getWatchList,
  isMovieWatched,
} from "./handlers/watchlistHandler";

const router = Router();

//Movies
router.post(
  "/movie/:id",
  body("title").exists().isString(),
  body("overview").exists().isString(),
  body("release_date").exists().isString(),
  body("vote_average").exists().isNumeric(),
  body("poster_path").exists().isString(),
  body("backdrop_path").exists().isString(),
  body("id").exists().isNumeric(),
  getMovie
);

// comments

router.get("/comment/:movieId", getComments);
router.post(
  "/comment/:movieId",
  body("comment").exists().isString(),
  createComment
);
router.put(
  "/comment/:movieId",
  body("comment").exists().isString(),
  body("id").exists().isString(),
  updateComment
);
router.delete("/comment/:id", deleteComment);

// Ratings
router.get("/rating/:movieId", getRating);
router.put("/rating/:movieId", updateRating);
router.post(
  "/rating/:movieId",
  body("userRating").exists().isNumeric(),
  createRating
);

// watchList

router.get("/watchlist/", getWatchList);
router.delete("/watchlist/:movieId", deleteWatchList);
router.post("/watchlist/:movieId", createWatchList);
router.post("/watchlist/check/:movieId", isMovieWatched);

router.use((err, req, res, next) => {
  console.log(err);
  return res
    .status(500)
    .json({ message: "Something went wrong in router handler" });
});
export default router;
