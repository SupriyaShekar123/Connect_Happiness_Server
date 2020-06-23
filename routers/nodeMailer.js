var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
const creds = require("../config/coy");
const User = require("../models/").user;
const { Op } = require("sequelize");

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

// router.post("/send", (req, res, next) => {
//   var name = "Volunteers"; //req.body.name;
//   var email = "giridhar97@gmail.com"; //req.body.email;
//   var message = "Help needed in shopping"; //req.body.message;
//   var content = `name: ${name} \n email: ${email} \n message: ${message} `;

//   var mail = {
//     from: "connecthappinesssnode@gmail.com",
//     to: "s.supriya82@gmail.com", //Change to email address that you want to receive messages on
//     subject: "New Message from Contact Form",
//     text: content,
//   };

//   console.log("message", message, name, email);

//   transporter.sendMail(mail, (err, data) => {
//     if (err) {
//       res.json({
//         msg: "fail",
//       });
//     } else {
//       res.json({
//         msg: "success",
//       });
//     }
//   });
// });

//*************************************************

async function getVolunteerEmail() {
  try {
    const volunteers = await User.findAll({
      where: {
        roles: {
          [Op.like]: "%volunteer%",
        },
      },
    });
    const emailID = volunteers.map((t) => {
      console.log(t.dataValues.email);
      return (
        //
        t.dataValues.email
      );
    });
    return emailID;
  } catch (e) {
    return "Fail";
  }
}
router.post("/send", async (req, res, next) => {
  //   var name = "Volunteers"; //req.body.name;
  //   var message = "Help needed in shopping"; //req.body.message;
  //   var content = `name: ${name} \n email: ${email} \n message: ${message} `;

  let emailid = await getVolunteerEmail();
  console.log("return from funciton :", emailid);

  var mail = {
    from: "connecthappinesssnode@gmail.com",
    to: emailid, //"s.supriya82@gmail.com", //Change to email address that you want to receive messages on
    subject: "NEED  ASSISTANCE FOR ",
    text:
      "Hello Volunteers, \n User, needs assitance for shopping can someone help. please login to the app and connect with respective person \nThanks and Regards,\n Team ConnectHappiness ",
  };

  //   console.log("message", message, name, email);

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
