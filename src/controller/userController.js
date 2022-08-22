const FoodUserModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const secret = process.env || require('../../secrets');
async function getallUserController(req,res) {
    res.send("You are Logged In");
}
async function userController(req,res,next) {
    // fetch the user
    try {
        let userId = req.userId;
        let user = await FoodUserModel.findById(userId);
        res.send({
            data: user,
            message: "Data of Logged in User is sent"
        });
    } catch(err) {
        res.send({
            data:err,
            message: "Some Error has Occured"
        })
    }
}
function privateRoute(req,res,next) {
    try {
        const cookie = req.cookie;
        const user = cookie.jwt;
        if(cookie.jwt) {
            console.log("Protect Route Encountered");
            let token = jwt.verify(user,secret.secretKey);
            console.log(token);
            req.userId = token.data;
            next();
        } else {
            res.send("User Not Found Please Login");
        }
    } catch(err) {
        res.send("Error:",err);
    }
}
module.exports = {
    getallUserController,
    userController,
    privateRoute
}