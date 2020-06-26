const cron = require("node-cron");
var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
const creds = require("../config/conifg");
//const User = require("../models/").user;
const Shopping = require("../models/").shoppinglist;
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

async function getShoppingListDetails() {
  try {
    const shoppingLists = await Shopping.findAll({
      where: {
        status: {
          [Op.like]: "%open%",
        },
      },
    });
    console.log("Shopping Lists", shoppingLists);
    // const emailID = volunteers.map((t) => {
    //   //   console.log(t.dataValues.email);
    //   return (
    //     //
    //     t.dataValues.email
    //   );
    // });
    return shoppingLists;
  } catch (e) {
    return "Fail";
  }
}
router.post("/reminder", async (req, res, next) => {
  //   var name = "Volunteers"; //req.body.name;
  //   var message = "Help needed in shopping"; //req.body.message;
  //   var content = `name: ${name} \n email: ${email} \n message: ${message} `;
  //let id = req.body.id;

  //const { spid } = req.body;

  //console.log("REQUEST BODY", spid);

  //let emailid = await getVolunteerEmail();
  //   console.log("return from funciton :", emailid);

  //   let id = await getShoppingListId();
  //   console.log("return lists", id);
  //   let task = cron.schedule("* * * * *", function () {
  //     console.log("---------------------");
  //     console.log("Running Cron Job");
  var mail = {
    from: "connecthappinesssnode@gmail.com",
    to: "s.supriya82@gmail.com", //Change to email address that you want to receive messages on
    subject: "NEED  ASSISTANCE FOR ",
    text:
      "Hello Volunteers, \n Senior citizens, needs assitance for shopping can someone help. please login to the app and connect with respective person or click the below link.\nThanks and Regards,\n Team ConnectHappiness ",
    html: `<p>Click <a href="http://localhost:3000/login">here</a>`,
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
//   task.start();
// });

module.exports = router;
