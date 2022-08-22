const mongoose = require('mongoose');

let plansSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Plan Name cannot be Empty"],
        unique: [true,"This Plan Name Already Exists"],
        maxLength: 20
    },
    duration: {
        type: String,
        required: [true,"Duration Can't be Empty"]
    },price : {
        type: Number,
        required: [true,"Price is Required"]
    },
    discount: {
        type: Number,
        validate : {
            validator: function() {
                return this.price - this.discount;
            },
            message: "Discount Price can't exceed Selling Price"
        }
    }
});

let PlanUserModel = mongoose.model("PlanUserModel",plansSchema);
module.exports = PlanUserModel;