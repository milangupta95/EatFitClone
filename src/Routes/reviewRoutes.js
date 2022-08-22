const {createReviewController,getAllReviewsController} = require("../controller/reviewController");
const express = require('express');
const reviewRoutes = express.Router();

reviewRoutes.post("/",createReviewController);
reviewRoutes.get("/",getAllReviewsController);

module.exports = reviewRoutes;