const express = require('express');
const app = express();
app.use(express.json());
// const cookieparser = require('cookieparser');
// app.use(cookieparser());
const authRouter = require("./src/Routes/authRoutes");
const userRouter = require("./src/Routes/userRoutes");
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",userRouter);
app.listen(3000,function() {
    console.log("App Has been Started at 3000");
});