const express = require("express");
const authMiddelware = require("../auth/middleware");
const Events = require("../models/").events;
const { Router } = express;

const router = new Router();

router.get("/events", async function getEventsList(req, res, next) {
  try {
    const getData = await Events.findAll();

    res.json(getData);
  } catch (e) {
    next(e);
  }
});

console.log("Events", Events.params);

// router.get("/:id", async function getEventsList(req, res, next) {
//   try {
//     const getData = await Events.findAll();

//     res.json(getData);
//   } catch (e) {
//     next(e);
//   }
// });

router.get("/events/:id", async (req, res) => {
  const Id = parseInt(req.params.id);
  const events = await Events.findByPk(Id);
  if (!events) {
    res.status(404).send("Events not found");
  } else {
    res.json(events);
  }
});

router.post("/events", async (req, res) => {
  // console.log("reqeust body", req.body);
  try {
    const { title, detail, imageUrl, date, location, userId } = req.body;
    console.log("request testing values :", req.body);
    if (!title || !detail || !imageUrl || !date || !location || !userId) {
      res.status(400).send("missing parameters");
    } else {
      // const hashedPassword = bcrypt.hashSync(password, 10);
      const event = await Events.create({
        title,
        detail,
        imageUrl,
        date,
        location,
        userId,
      });
      res.json(event);
    }
  } catch (e) {
    // next(e);
  }
});

module.exports = router;
