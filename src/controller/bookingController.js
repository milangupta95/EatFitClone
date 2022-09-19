const bookingModel = require('../model/bookingModel');
const userModel = require('../model/userModel');
const key_id = require('../../secrets').key_id;
const key_secret = require('../../secrets').key_secret;
const Razorpay = require('razorpay');

const instance = new Razorpay({
    key_id: key_id,
    key_secret: key_secret
});
// intiate booking
async function intiateBooking(req,res) {
    try {
        // 1. save to booking Model
        let booking = await bookingModel.create(req.body);
        let bookingId = booking["_id"];
        // 2. Save this UID to userModel
        let userId = booking["user"];
        let user = await userModel.findById(userId);
        user.bookings.push(userId);
        await user.save();
        // 3. CheckOut
        const ammount = req.body.priceAtThatTime;
        const currency = "INR";

        const options = {
            ammount,
            currency,
            reciept: `rs_${bookingId}`
        }

        const response = await instance.order.create(options);
        console.log(response);
        // respond to server
        res.status(200).json({
            ammount: ammount,
            currency: "INR",
            booking:booking,
            message: "booking Created"
        });
    } catch(err) {
        res.status(500).json({
            message: "Unable to Create"
        })
    }
}
async function verifyPayment(req, res) {
    // JWT 
    const secret = key_secret;
    // console.log(req.body);
    // 
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    console.log(digest, req.headers["x-razorpay-signature"]);
    if (digest === req.headers["x-razorpay-signature"]) {
    //   payment is done 
        console.log("request is legit");
        res.status(200).json({
            message: "OK",
        });
    } else {
        res.status(403).json({ message: "Invalid" });
    }
}
async function getBookingById(req, res) {
    try {
        let id = req.params.bookingId;
        let booking = await bookingModel.findById(id);
        res.status(200).json({
            result: "booking found",
            booking: booking

        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            err: err.message
        })
    }
}
async function getBookings(req, res) {
    try {
        let bookings = await bookingModel.find();
        // to send json data ;
        res.status(200).json(bookings);
    } catch (err) {
        res.end(err.message);
    }
}
module.exports = {
    intiateBooking,
    verifyPayment,
    getBookings, getBookingById
}