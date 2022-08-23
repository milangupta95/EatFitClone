const nodemailer = require('nodemailer');
const secret = require('../../secrets');

async function sendMail(email,otp) {
    async function mailer() {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: secret.APP_USER, // generated ethereal user
                pass: secret.APP_PASSWORD, // generated ethereal password
            },
        });
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'Milan Kumar Gupta', // sender address
            to: email, // list of receivers
            subject: "otp ✔", // Subject line
            html: "<b>" + otp + "</b>", // html body
        });
    }
    
    mailer().then(function () {
        console.log("The Mail has been SuccesFully Delivered");
    }).catch(function (err) {
        console.log("Error:", err);
    });
}
// async..await is not allowed in global scope, must use a wrapper

module.exports = sendMail;