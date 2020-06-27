const express = require("express");
const authMiddelware = require("../auth/middleware");
const Events = require("../models/").events;
const Participents = require("../models").participents;
const User = require("../models").user;
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

// router.get("/participents", async function getEventsList(req, res, next) {
//   try {
//     const getData = await Participents.findAll({
//       where: {
//         eventId: {
//           include: [Events],
//         },
//       },
//     });

//     res.json(getData);
//   } catch (e) {
//     next(e);
//   }
// });

// router.get("/part/:id", async (req, res) => {
//   const Id = parseInt(req.params.id);
//   const events = await Events.findByPk(1, {
//     include: [Participents],
//   });
//   if (!events) {
//     res.status(404).send("Events not found");
//   } else {
//     res.json(events);
//   }
// });

router.delete("/participents/:userId", async (req, res, next) => {
  try {
    const eventsId = parseInt(req.params.userId);
    const toDelete = await Participents.findByPk(eventsId);
    if (!toDelete) {
      res.status(404).send("List not found");
    } else {
      const deleted = await toDelete.destroy();
      res.json(deleted);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
