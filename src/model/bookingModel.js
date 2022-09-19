const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: [true,"Booking Must Belong to user"],
        ref: userModel
    },
    plan: {
        type: mongoose.Schema.ObjectId,
        required: [true,"Must Buy a Plan"],
        ref: planModel
    },
    timeofBooking: {
        type: Date,
        default: Date.now()
    },
    priceAtThatTime: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending","success","failed"],
        default: "pending"
    }
});
const bookingModel = mongoose.Model(bookingSchema);
module.exports = bookingModel;
