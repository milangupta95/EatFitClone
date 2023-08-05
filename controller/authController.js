const FoodUserModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey || require('../../secrets').secretKey;
const sendMail = require("../utility/mailer");

async function signupController(req,res) {
    try {
        console.log("SignUp Called");
        let data = req.body;
        let user = await FoodUserModel.create(data);
        console.log(user);
        res.status(201).json({
            data: user,
            message:"The User Has Been Created SuccesFully"
        });
    } catch(err) {
        res.status(500).json({
            "Error":err
        });
    }
}
async function loginController(req,res) {
    try {
        let {email,password} = req.body;
        if(email) {
            let user = await FoodUserModel.findOne({email:email});
            if(user) {
                if(user.password === password) {
                    let userToken = jwt.sign({
                        data:user["_id"],
                        exp: Date.now() / 1000 + 24*60*60},
                        secretKey);
                    res.cookie('JWT',userToken);
                    res.status(200).json({
                        data: user,
                        result:"User Logged in"
                    });
                } else {
                    res.status(404).json({
                        result:"Email and Password Does Not Match"
                    });
                }
            } else {
                res.status(400).json({
                    result:"User with this Email is not Associated"});
            }
        } else {
            res.status(400).json({
                result:"Please Enter The Email"
            });
        }
    } catch(err) {
        res.status(500).json({
            result: err.message
        });
    }
}
async function forgetpasswordController(req,res){
    try {
        let email = req.body.email;
        console.log(email);
        let user = await FoodUserModel.findOne({email:email});
        console.log(user);
        if(user) {
            let otp = otpGenerator();
            let afterFiveMinute = (Date.now()) + 5 * 60 * 60 * 1000;
            let user = await FoodUserModel.findOne({email:email});
            user.otp = otp;
            user.otpExpiry = afterFiveMinute;
            await user.save();
            await sendMail(email,otp);
            res.status(200).json({
                data: user,
                message: "Otp has been sucessfully Sent to your email"
            })
        } else {
            res.status(404).json({
                result: "User with this Email is Not Found"
            })
        }
    } catch(err) {
        res.status(500).json({
            result: err.message
        });
    }
}
async function resetpasswordController(req,res) {
    try{
        let {otp,email,password,confirmPassword} = req.body;
        let user = await FoodUserModel.findOne({email:email});
        let currTime = Date.now();
        if(currTime > user.otpExpiry ) {
            delete user.otp;
            delete user.otpExpiry;
            await user.save();
            res.status(201).json({
                message:"Otp Has Been Expired"
            });
        } else {
            if(user.otp != otp ) {
                res.status(400).json({
                    result:"The Otp doesn't Match"
                });
            } else {
                user = await FoodUserModel.findOneAndUpdate({otp},
                    {password,confirmPassword},
                    {runValidators:true,new: true});
                delete user.otp;
                delete user.otpExpiry;
                await user.save();
                res.status(200).json({
                    data: user,
                    message:"The Password Has been Updated Sucessfully"
                });
            }
        }
    }catch(err) {
        res.status(500).json({
            result:err.message
        });
    }
}
function otpGenerator() {
    return Math.floor(100000 + Math.random() * 900000);
}

module.exports = {
    signupController,
    loginController,
    forgetpasswordController,
    resetpasswordController,
};