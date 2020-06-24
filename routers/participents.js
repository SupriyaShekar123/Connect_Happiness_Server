const express = require("express");
const authMiddelware = require("../auth/middleware");
const Events = require("../models/").events;
const Participents = require("../models").participents;
const { Router } = express;

const router = new Router();

router.post("/participents", async (req, res) => {
  // console.log("reqeust body", req.body);
  try {
    const { eventId, userId } = req.body;
    console.log("request testing values :", req.body);
    if (!eventId || !userId) {
      res.status(400).send("missing parameters");
    } else {
      // const hashedPassword = bcrypt.hashSync(password, 10);
      const event = await Participents.create({
        eventId,
        userId,
      });
      res.json(event);
    }
  } catch (e) {
    // next(e);
  }
});

module.exports = router;
