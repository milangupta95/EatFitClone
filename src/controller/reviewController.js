const PlanUserModel = require("../model/plansModel");
const FoodReviewModel = require("../model/reviewModel");
async function createReviewController(req,res) {
    try {
        let reviewData = req.body;
        let review = await FoodReviewModel.create(reviewData);
        let reviewId = review["_id"];
        let currentPlan = await PlanUserModel.findById(review.user);
        let totalNoofRating = currentPlan.reviews.length;
        let oldAvgRating = currentPlan.averageRating;
        if(oldAvgRating) {
            let newAvgRating = (oldAvgRating * totalNoofRating + review.rating) / (totalNoofRating + 1);
            currentPlan.averageRating = newAvgRating;
        } else {
            currentPlan.averageRating = review.rating;
        }
        currentPlan.reviews.push(reviewId);
        await currentPlan.save();
        res.send({
            data: review,
            message: "Review Has Been Added SuccessFully",
        })
    } catch(err) {
        console.log("Error:",err.message);
    }
}

async function getAllReviewsController(req,res) {
    try {
        let ratings = FoodReviewModel.find()
        .populate({path:"user",select:"name pic"})
        .populate({path:"plan",select:"name"});
        res.send({
            data: ratings,
            result: "Data Send SuccessFully"
        });
    } catch(err) {
        console.log("Error:",err.message);
    }
}

module.exports = {
    createReviewController,
    getAllReviewsController
}