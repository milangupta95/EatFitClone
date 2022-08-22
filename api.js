const express = require('express');
const app = express();
app.use(express.json());
// const cookieparser = require('cookieparser');
// app.use(cookieparser());
const authRouter = require("./src/Routes/authRoutes");
const userRouter = require("./src/Routes/userRoutes");
const planRouter = require("./src/Routes/plansRoutes");
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/plans",planRouter);

const port = process.env.port || 3000;
app.listen(port,function() {
    console.log("App Has been Started at 3000");
});