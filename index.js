const express = require("express");
const app = express();
const cors = require("cors");

var nodemailer = require("nodemailer");
const cron = require("node-cron");
// const loggerMiddleWare = require("morgan");
const corsMiddleWare = require("cors");
const { PORT } = require("./config/constants");
const authRouter = require("./routers/auth");
const authMiddleWare = require("./auth/middleware");
const Events = require("./routers/events");
const SSE = require("./routers/sse");
const Shopping = require("./routers/shopping");
const Email = require("./routers/nodeMailer");
const User = require("./routers/users");
const Reminder = require("./routers/reminder");
const Participents = require("./routers/participents");
// const cors = require("cors");
const helperfunction = require("./routers/generalfunctions");
const creds = require("./config/conifg");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());
const jsonParser = express.json();
app.use(jsonParser);

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

app.use(corsMiddleWare());

if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

// GET endpoint for testing purposes, can be removed
app.get("/", (req, res) => {
  res.send("Hi from express");
});

// POST endpoint for testing purposes, can be removed
app.post("/echo", (req, res) => {
  res.json({
    youPosted: {
      ...req.body,
    },
  });
});

// POST endpoint which requires a token for testing purposes, can be removed
app.post("/authorized_post_request", authMiddleWare, (req, res) => {
  // accessing user that was added to req by the auth middleware
  const user = req.user;
  // don't send back the password hash
  delete user.dataValues["password"];

  res.json({
    youPosted: {
      ...req.body,
    },
    userFoundWithToken: {
      ...user.dataValues,
    },
  });
});

app.use("/", authRouter);
app.use("/", Shopping);
app.use("/", SSE);
app.use("/", Email);
app.use("/", Reminder);

//app.use("/:id", Events);
app.use("/", Events);
app.use("/", User);
app.use("/", Participents);
app.all("*", function (req, res) {
  throw new Error("Bad request");
});

app.use(function (e, req, res, next) {
  if (e.message === "Bad request") {
    res.status(400).json({ error: { msg: e.message, stack: e.stack } });
  }
});

// Listen for connections on specified port (default is port 4000)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// const { Op } = require("sequelize");

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

let task = cron.schedule(" 0 10 * * *", async function () {
  const emailid = await helperfunction.getVolunteerEmail();
  const counOfOpenRequest = await helperfunction.checkOpenRequests();

  if (
    emailid === "Fail" ||
    counOfOpenRequest === "Fail" ||
    parseInt(counOfOpenRequest) < 1
  ) {
    console.log("Fail code executed ");
  } else {
    console.log("sucessfull job exeuction");

    var mail = {
      from: "connecthappinesssnode@gmail.com",
      to: emailid, //Change to email address that you want to receive messages on
      subject: " connect happiness: Need Help ",
      html: `Hello Volunteers, <br>
         There are some open requests please login to the app and connect with respective person or click the below link.
         <br>
         Thanks and Regards,<br>
          Team ConnectHappiness ,
       <p>Click <a href="http://localhost:3000/login">here</a>`,
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
  }
});

task.start();
