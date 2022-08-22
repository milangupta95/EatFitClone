const mongoose = require('mongoose');

let reviewSchema = new mongoose.Schema({
    description: {
        type: String,

    },
    rating: {

    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: [true,"User can't be empty"],
        ref: "FoodUserModel",
    },
    plan: {
        type: mongoose.Schema.ObjectId,
        required: [true,"Plan can't be empty"],
        ref: "PlanUserModel",
    }
});

const FoodReviewModel = mongoose.model("FoodReviewModel",reviewSchema);
module.exports = FoodReviewModel;