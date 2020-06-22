var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
const creds = require("../config/config");

var transport = {
  host: "smtp.gmail.com",
  auth: {
    user: creds.USER,
    pass: creds.PASS,
  },
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

router.post("/send", (req, res, next) => {
  var name = "Volunteers"; //req.body.name;
  var email = "giridhar97@gmail.com"; //req.body.email;
  var message = "Help needed in shopping"; //req.body.message;
  var content = `name: ${name} \n email: ${email} \n message: ${message} `;

  var mail = {
    from: "connecthappinesssnode@gmail.com",
    to: "s.supriya82@gmail.com", //Change to email address that you want to receive messages on
    subject: "New Message from Contact Form",
    text: content,
  };

  console.log("message", message, name, email);

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: "fail",
      });
    } else {
      res.json({
        msg: "success",
      });
    }
  });
});

module.exports = router;
