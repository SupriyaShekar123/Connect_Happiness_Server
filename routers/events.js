const express = require("express");
const authMiddelware = require("../auth/middleware");
const Events = require("../models/").events;
//'const Bids = require("../models/").bid;
//console.log("Artwork", Artwork);
const { Router } = express;

const router = new Router();

router.get("/", async function getEventsList(req, res, next) {
  try {
    const getData = await Events.findAll();

    res.json(getData);
  } catch (e) {
    next(e);
  }
});

// router.get("/:id", async function getEventsList(req, res, next) {
//   try {
//     const getData = await Events.findAll();

//     res.json(getData);
//   } catch (e) {
//     next(e);
//   }
// });

router.get("/:id", async (req, res) => {
  const Id = parseInt(req.params.id);
  const events = await Events.findByPk(Id);
  if (!events) {
    res.status(404).send("Events not found");
  } else {
    res.json(events);
  }
});

module.exports = router;
