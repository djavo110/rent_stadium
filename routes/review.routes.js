const { Router } = require("express");
const {
  getReviewAll,
  getOneReviewById,
  createReview,
  updateReviewById,
  removeReviewById,
} = require("../controllers/review.controller");

let reviewRouter = Router();

reviewRouter.get("/all", getReviewAll);
reviewRouter.get("/:id", getOneReviewById);
reviewRouter.post("/create", createReview);
reviewRouter.patch("/:id", updateReviewById);
reviewRouter.delete("/:id", removeReviewById);

module.exports = reviewRouter;
