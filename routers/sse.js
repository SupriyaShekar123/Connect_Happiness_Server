const express = require("express");
const authMiddelware = require("../auth/middleware");
//const Events = require("../models/").events;
//'const Bids = require("../models/").bid;
//console.log("Artwork", Artwork);
const { Router } = express;

const router = new Router();

router.get("/stream", (req, res) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  //const data = { data: "Hello supriya \n\n" };
  res.write(`data: Hello world Giridhar \n\n`);

  //   setInterval(() => {
  //     data.timestamp = Date.now();
  //     res.write(`data: ${JSON.stringify(data)}} \n\n`);
  //   }, 2000);
});

module.exports = router;
