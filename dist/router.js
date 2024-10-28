"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var movieHandler_1 = require("./handlers/movieHandler");
var commentHandler_1 = require("./handlers/commentHandler");
var ratingHandler_1 = require("./handlers/ratingHandler");
var watchlistHandler_1 = require("./handlers/watchlistHandler");
var router = (0, express_1.Router)();
//Movies
router.post("/movie/:id", (0, express_validator_1.body)("title").exists().isString(), (0, express_validator_1.body)("overview").exists().isString(), (0, express_validator_1.body)("release_date").exists().isString(), (0, express_validator_1.body)("vote_average").exists().isNumeric(), (0, express_validator_1.body)("poster_path").exists().isString(), (0, express_validator_1.body)("backdrop_path").exists().isString(), (0, express_validator_1.body)("id").exists().isNumeric(), movieHandler_1.getMovie);
// comments
router.get("/comment/:movieId", commentHandler_1.getComments);
router.post("/comment/:movieId", (0, express_validator_1.body)("comment").exists().isString(), commentHandler_1.createComment);
router.put("/comment/:movieId", (0, express_validator_1.body)("comment").exists().isString(), (0, express_validator_1.body)("id").exists().isString(), commentHandler_1.updateComment);
router.delete("/comment/:id", commentHandler_1.deleteComment);
// Ratings
router.get("/rating/:movieId", ratingHandler_1.getRating);
router.put("/rating/:movieId", ratingHandler_1.updateRating);
router.post("/rating/:movieId", (0, express_validator_1.body)("userRating").exists().isNumeric(), ratingHandler_1.createRating);
// watchList
router.get("/watchlist/", watchlistHandler_1.getWatchList);
router.delete("/watchlist/:movieId", watchlistHandler_1.deleteWatchList);
router.post("/watchlist/:movieId", watchlistHandler_1.createWatchList);
router.post("/watchlist/check/:movieId", watchlistHandler_1.isMovieWatched);
router.use(function (err, req, res, next) {
    console.log(err);
    return res
        .status(500)
        .json({ message: "Something went wrong in router handler" });
});
exports.default = router;
//# sourceMappingURL=router.js.map