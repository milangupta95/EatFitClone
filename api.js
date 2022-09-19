const express = require('express');
const app = express();
app.use(express.json());
// const cookieparser = require('cookieparser');
// app.use(cookieparser());
const authRouter = require("./src/Routes/authRoutes");
const userRouter = require("./src/Routes/userRoutes");
const planRouter = require("./src/Routes/plansRoutes");
const reviewRouter = require("./src/Routes/reviewRoutes");
const bookingRouter = require("./src/Routes/bookingRoutes");
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/plans",planRouter);
app.use("/api/v1/review",reviewRouter);
app.use("/api/v1/booking",bookingRouter);
app.get("/",function(req,res){
    res.status(200).send("Home Page");
});

app.listen(process.env.PORT || 3000,function() {
    console.log("App Has been Started at 3000");
});