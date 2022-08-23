const FoodUserModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey || require('../../secrets').secretKey;
function privateRoute(req,res,next) {
    try {
        const cookie = req.cookie;
        const user = cookie.jwt;
        if(cookie.jwt) {
            console.log("Protect Route Encountered");
            let token = jwt.verify(user,secretKey);
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
async function getallUserController(req,res) {
    res.send("You are Logged In");
}
async function userController(req,res) {
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
module.exports = {
    getallUserController,
    userController,
    privateRoute
}