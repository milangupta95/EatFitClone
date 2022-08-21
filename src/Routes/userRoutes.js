const express = require('express');
// const app = express();
const {
    getallUserController,
    userController,
    privateRoute
} = require("../controller/userController");
const userRouter = express.Router();
userRouter.post("/users",privateRoute,getallUserController);
userRouter.post("/user",privateRoute,userController);

module.exports = userRouter;