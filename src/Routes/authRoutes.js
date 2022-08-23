const express = require('express');
const authRouter = express.Router();
const {signupController,loginController,forgetpasswordController
    ,resetpasswordController} = require('../controller/authController');
authRouter.post("/signup",signupController);
authRouter.post("/login",loginController);
authRouter.patch("/forgotpassword",forgetpasswordController);
authRouter.patch("/resetpassword",resetpasswordController);
module.exports = authRouter;