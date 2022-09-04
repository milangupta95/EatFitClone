const express = require('express');
const app = express();
app.use(express.json());
// const cookieparser = require('cookieparser');
// app.use(cookieparser());
const authRouter = require("./src/Routes/authRoutes");
const userRouter = require("./src/Routes/userRoutes");
const planRouter = require("./src/Routes/plansRoutes");
const reviewRouter = require("./src/Routes/reviewRoutes");
app.use("/api/v22/auth",authRouter);
app.use("/api/v22/user",userRouter);
app.use("/api/v22/plans",planRouter);
app.use("/api/v22/review",reviewRouter);
app.get("/",function(req,res){
    res.status(200).send("Home Page");
});

app.listen(process.env.PORT || 3000,function() {
    console.log("App Has been Started at 3000");
});