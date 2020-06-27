const express = require("express");
const app = express();

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
const cors = require("cors");
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
//
//const app = express();
//app.use("/stream", SSE);
// app.use("/shopping", Shopping);
// app.use("/events", Events);
// app.use("/:id", Events);

// app.get("/stream", (req, res) => {
//   res.status(200).set({
//     "Content-Type": "text/event-stream",
//     "Cache-Control": "no-cache",
//     Connection: "keep-alive",

//     // enabling CORS
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Headers":
//       "Origin, X-Requested-With, Content-Type, Accept",
//   });

//   res.write(`data: Hello world \n\n`);
// });
//app.use("/bid", bids);

/**
 * Middlewares
 *
 * It is advisable to configure your middleware before configuring the routes
 * If you configure routes before the middleware, these routes will not use them
 *
 */

/**
 * morgan:
 *
 * simple logging middleware so you can see
 * what happened to your request
 *
 * example:
 *
 * METHOD   PATH        STATUS  RESPONSE_TIME   - Content-Length
 *
 * GET      /           200     1.807 ms        - 15
 * POST     /echo       200     10.251 ms       - 26
 * POST     /puppies    404     1.027 ms        - 147
 *
 * github: https://github.com/expressjs/morgan
 *
 */

//app.use(loggerMiddleWare("dev"));

/**
 *
 * express.json():
 * be able to read request bodies of JSON requests
 * a.k.a. body-parser
 * Needed to be able to POST / PUT / PATCH
 *
 * docs: https://expressjs.com/en/api.html#express.json
 *
 */

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

/**
 *
 * cors middleware:
 *
 * Since our api is hosted on a different domain than our client
 * we are are doing "Cross Origin Resource Sharing" (cors)
 * Cross origin resource sharing is disabled by express by default
 * for safety reasons (should everybody be able to use your api, I don't think so!)
 *
 * We are configuring cors to accept all incoming requests
 * If you want to limit this, you can look into "white listing" only certain domains
 *
 * docs: https://expressjs.com/en/resources/middleware/cors.html
 *
 */

app.use(corsMiddleWare());

/**
 *
 * delay middleware
 *
 * Since our api and client run on the same machine in development mode
 * the request come in within milliseconds
 * To simulate normal network traffic this simple middleware delays
 * the incoming requests by 1500 second
 * This allows you to practice with showing loading spinners in the client
 *
 * - it's only used when you use npm run dev to start your app
 * - the delay time can be configured in the package.json
 */

if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

/**
 *
 * authMiddleware:
 *
 * When a token is provided:
 * decrypts a jsonwebtoken to find a userId
 * queries the database to find the user with that add id
 * adds it to the request object
 * user can be accessed as req.user when handling a request
 * req.user is a sequelize User model instance
 *
 * When no or an invalid token is provided:
 * returns a 4xx reponse with an error message
 *
 * check: auth/middleware.js
 *
 * For fine grained control, import this middleware in your routers
 * and use it for specific routes
 *
 * for a demo check the following endpoints
 *
 * POST /authorized_post_request
 * GET /me
 *
 */

/**
 * Routes
 *
 * Define your routes here (now that middlewares are configured)
 */

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

let task = cron.schedule(" 0 23 * * *", async function () {
  const emailid = await helperfunction.getVolunteerEmail();
  const counOfOpenRequest = await helperfunction.checkOpenRequests();

  // console.log("TESTING FUNCTION :", counOfOpenRequest, "  , eimail: ", emailid);
  // console.log("---------------------", emailid);
  // console.log("Running Cron Job");
  // console.log("parse idn ", parseInt(counOfOpenRequest) < 1);

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
      to: emailid, //"s.supriya82@gmail.com", //Change to email address that you want to receive messages on
      subject: " connect happiness: Need Help ",
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
  }
});

task.start();
