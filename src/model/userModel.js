const mongoose = require('mongoose');
const dblink = process.env.dblink || require('../../secrets').dblink;
try {
    mongoose.
        connect(dblink, { useNewUrlParser: true, useUnifiedTopology: true }).
        then(function () {
            console.log("SuccesFully Connected to Database");
        }).
        catch(function (err) {
            console.log("error", err);
        });
    let userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "Name can't Be Empty"]
        },
        email: {
            type: String,
            required: [true, "Email can't be null"],
            unique: [true,"User with this email Already exists"]
        },
        password: {
            type: String,
            required: [true, "Email or Password Missing"]
        },
        confirmPassword: {
            type: String,
            required: [true, "Confirm Password Can't be empty"],

            validate: {
                validator: function () {
                    return this.password == this.confirmPassword;
                },
                message: "Password Miss Match"
            }
        },
        phone: {
            type: Number,
            unique: [true,"User with this phone number Already Exists"]
        },
        pic: {
            type: String,
            default: "default.jpg"
        },
        otp: {
            type: Number
        },
        otpExpiry: {
            type: Date
        }
    });
    const userModel = mongoose.model('FoodUserModel', userSchema);
    module.exports = userModel;
}catch(err) {
    alert(err.message);
}